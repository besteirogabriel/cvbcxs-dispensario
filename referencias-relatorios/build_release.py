import os,json,pathlib,urllib.request,concurrent.futures,subprocess,hashlib,zipfile,base64
import fitz
root=pathlib.Path('Referencias_Relatorios_Cruz_Vermelha');root.mkdir(exist_ok=True)
base='https://raw.githubusercontent.com/'+os.environ['GITHUB_REPOSITORY']+'/'+os.environ['GITHUB_SHA']+'/referencias-relatorios/'
for name in ['00_COMECE_AQUI.html','01_GUIA_PARA_CAXIAS.html','01_GUIA_PARA_CAXIAS.md','02_FONTES_E_VERIFICACAO.json','03_LEIA_ME.txt']:
 (root/name).write_bytes(urllib.request.urlopen(base+name,timeout=60).read())
manifest=json.loads((root/'02_FONTES_E_VERIFICACAO.json').read_text());rows=manifest['reports']
assert len(rows)==56

def download(d):
 p=root/d['path'];p.parent.mkdir(parents=True,exist_ok=True)
 for attempt in range(3):
  if attempt==0 and 'www.redcross.org/' in d['pdf_url']:
   try:
    p.write_bytes(urllib.request.urlopen(d['pdf_url'],timeout=90).read())
    r=subprocess.CompletedProcess([],0)
   except Exception as err:
    print('urllib',d['id'],str(err),flush=True)
    r=subprocess.CompletedProcess([],1)
  else:
   r=subprocess.run(['curl','-fLsS','--connect-timeout','30','--max-time','240','--retry','1',d['pdf_url'],'-o',str(p)],capture_output=True)
  if r.returncode==0 and p.is_file() and hashlib.sha256(p.read_bytes()).hexdigest()==d['sha256']:
   with fitz.open(p) as doc:
    assert len(doc)==d['pages']
    pix=doc[0].get_pixmap(matrix=fitz.Matrix(240/doc[0].rect.width,240/doc[0].rect.width),alpha=False)
    thumb=base64.b64encode(pix.tobytes('jpeg',jpg_quality=72)).decode()
   print('OK',d['id'],d['title'],flush=True)
   return d['id'],thumb
  print('Retry',d['id'],attempt+1,'code',r.returncode,'stderr',getattr(r,'stderr',b''),'bytes',p.stat().st_size if p.exists() else 0,flush=True)
 raise RuntimeError('Download/integrity failed: '+d['id']+' '+d['title'])
with concurrent.futures.ThreadPoolExecutor(max_workers=8) as ex:thumbs=dict(ex.map(download,rows))
html=(root/'00_COMECE_AQUI.html').read_text()
for key,value in thumbs.items():html=html.replace('@@COVER_'+key+'@@','data:image/jpeg;base64,'+value)
assert '@@COVER_' not in html
(root/'00_COMECE_AQUI.html').write_text(html)
filename='Referencias_Relatorios_Cruz_Vermelha.zip'
with zipfile.ZipFile(filename,'w',zipfile.ZIP_DEFLATED,compresslevel=6) as z:
 for p in sorted(root.rglob('*')):
  if p.is_file():z.write(p,str(p))
with zipfile.ZipFile(filename) as z:
 assert len([n for n in z.namelist() if n.endswith('.pdf')])==56
 assert z.testzip() is None
pathlib.Path('SHA256SUMS.txt').write_text(hashlib.sha256(pathlib.Path(filename).read_bytes()).hexdigest()+'  '+filename+'\n')
pathlib.Path('release-notes.md').write_text('56 relatórios de atividades da Cruz Vermelha, de 18 países, além da IFRC e do CICR. Inclui 16 documentos em português, catálogo pesquisável e guia para Caxias do Sul.\n\nBaixe Referencias_Relatorios_Cruz_Vermelha.zip, extraia e abra 00_COMECE_AQUI.html. PDFs originais conferidos por SHA-256. Fontes e créditos no pacote.\n')
print('READY',pathlib.Path(filename).stat().st_size,flush=True)
