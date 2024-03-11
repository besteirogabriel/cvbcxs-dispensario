const estoque = [
    { 
        medicamento: 'OSLAR',
        composto: 'OLMESARTANA MEDOXOMILA 40MG',
        laboratorio: 'MOMENTA',
        lote: '789443',
        fabricacao: '04/2022',
        validade: '04/2024',
        quantidade: 6
    },     
    { 
        medicamento: 'KAMPPI',
        composto: 'CLORIDRATO DE MEMANTINA',
        laboratorio: 'BIOLAB',
        lote: '1061969',
        fabricacao: '03/2021',
        validade: '03/2024',
        quantidade: 64
    },
    { 
        medicamento: 'PARACETAMOL',
        composto: 'PARACETAMOL 500MG',
        laboratorio: 'GENÉRICO',
        lote: '789123',
        fabricacao: '01/2023',
        validade: '01/2025',
        quantidade: 100
    },
    { 
        medicamento: 'IBUPROFENO',
        composto: 'IBUPROFENO 400MG',
        laboratorio: 'GENÉRICO',
        lote: '456789',
        fabricacao: '05/2022',
        validade: '05/2024',
        quantidade: 80
    },
    { 
        medicamento: 'AMOXICILINA',
        composto: 'AMOXICILINA 500MG',
        laboratorio: 'GENÉRICO',
        lote: '123456',
        fabricacao: '08/2023',
        validade: '08/2025',
        quantidade: 120
    },
    { 
        medicamento: 'SINVASTATINA',
        composto: 'SINVASTATINA 20MG',
        laboratorio: 'GENÉRICO',
        lote: '987654',
        fabricacao: '11/2021',
        validade: '11/2023',
        quantidade: 55
    },
    { 
        medicamento: 'LOSARTANA',
        composto: 'LOSARTANA POTÁSSICA 50MG',
        laboratorio: 'GENÉRICO',
        lote: '555444',
        fabricacao: '06/2022',
        validade: '06/2024',
        quantidade: 70
    },
    { 
        medicamento: 'METFORMINA',
        composto: 'METFORMINA 850MG',
        laboratorio: 'GENÉRICO',
        lote: '222333',
        fabricacao: '02/2023',
        validade: '02/2025',
        quantidade: 90
    },
    { 
        medicamento: 'PANTOPRAZOL',
        composto: 'PANTOPRAZOL 40MG',
        laboratorio: 'GENÉRICO',
        lote: '777888',
        fabricacao: '09/2022',
        validade: '09/2024',
        quantidade: 110
    },
    { 
        medicamento: 'DIPIRONA',
        composto: 'DIPIRONA SÓDICA 500MG',
        laboratorio: 'GENÉRICO',
        lote: '333222',
        fabricacao: '07/2022',
        validade: '07/2024',
        quantidade: 75
    },
    { 
        medicamento: 'ASPIRINA',
        composto: 'ÁCIDO ACETILSALICÍLICO 100MG',
        laboratorio: 'GENÉRICO',
        lote: '111000',
        fabricacao: '12/2022',
        validade: '12/2024',
        quantidade: 85
    },
    { 
        medicamento: 'LEVOFLOXACINO',
        composto: 'LEVOFLOXACINO 500MG',
        laboratorio: 'GENÉRICO',
        lote: '543210',
        fabricacao: '10/2022',
        validade: '10/2024',
        quantidade: 45
    },
    { 
        medicamento: 'ONDANSETRONA',
        composto: 'ONDANSETRONA 8MG',
        laboratorio: 'GENÉRICO',
        lote: '999888',
        fabricacao: '01/2023',
        validade: '01/2025',
        quantidade: 65
    },
    { 
        medicamento: 'LORATADINA',
        composto: 'LORATADINA 10MG',
        laboratorio: 'GENÉRICO',
        lote: '444555',
        fabricacao: '03/2023',
        validade: '03/2025',
        quantidade: 55
    },
    { 
        medicamento: 'NAPROXENO',
        composto: 'NAPROXENO 550MG',
        laboratorio: 'GENÉRICO',
        lote: '123789',
        fabricacao: '05/2023',
        validade: '05/2025',
        quantidade: 80
    },
    { 
        medicamento: 'CETIRIZINA',
        composto: 'CETIRIZINA 10MG',
        laboratorio: 'GENÉRICO',
        lote: '987654',
        fabricacao: '08/2022',
        validade: '08/2024',
        quantidade: 70
    },
    { 
        medicamento: 'RAMIPRIL',
        composto: 'RAMIPRIL 5MG',
        laboratorio: 'GENÉRICO',
        lote: '456123',
        fabricacao: '07/2022',
        validade: '07/2024',
        quantidade: 45
    },
    { 
        medicamento: 'HIDROCLOROTIAZIDA',
        composto: 'HIDROCLOROTIAZIDA 25MG',
        laboratorio: 'GENÉRICO',
        lote: '456321',
        fabricacao: '06/2023',
        validade: '06/2025',
        quantidade: 55
    },
    { 
        medicamento: 'LEVOTIROXINA',
        composto: 'LEVOTIROXINA 50MCG',
        laboratorio: 'GENÉRICO',
        lote: '789321',
        fabricacao: '04/2022',
        validade: '04/2024',
        quantidade: 100
    },
    { 
        medicamento: 'FLUOXETINA',
        composto: 'FLUOXETINA 20MG',
        laboratorio: 'GENÉRICO',
        lote: '963852',
        fabricacao: '11/2022',
        validade: '11/2024',
        quantidade: 60
    },
    { 
        medicamento: 'AMLODIPINA',
        composto: 'AMLODIPINA 5MG',
        laboratorio: 'GENÉRICO',
        lote: '147258',
        fabricacao: '09/2022',
        validade: '09/2024',
        quantidade: 70
    },
    { 
        medicamento: 'CIPROFLOXACINO',
        composto: 'CIPROFLOXACINO 500MG',
        laboratorio: 'GENÉRICO',
        lote: '321654',
        fabricacao: '02/2023',
        validade: '02/2025',
        quantidade: 85
    },
    { 
        medicamento: 'MORFINA',
        composto: 'MORFINA 10MG',
        laboratorio: 'GENÉRICO',
        lote: '741852',
        fabricacao: '10/2022',
        validade: '10/2024',
        quantidade: 40
    },
    { 
        medicamento: 'DEXAMETASONA',
        composto: 'DEXAMETASONA 4MG',
        laboratorio: 'GENÉRICO',
        lote: '852741',
        fabricacao: '08/2023',
        validade: '08/2025',
        quantidade: 55
    },
    { 
        medicamento: 'CLONAZEPAM',
        composto: 'CLONAZEPAM 2MG',
        laboratorio: 'GENÉRICO',
        lote: '369852',
        fabricacao: '01/2023',
        validade: '01/2025',
        quantidade: 50
    },
    { 
        medicamento: 'TRAMADOL',
        composto: 'TRAMADOL 50MG',
        laboratorio: 'GENÉRICO',
        lote: '258369',
        fabricacao: '12/2022',
        validade: '12/2024',
        quantidade: 75
    },
    { 
        medicamento: 'FENITOÍNA',
        composto: 'FENITOÍNA 100MG',
        laboratorio: 'GENÉRICO',
        lote: '951753',
        fabricacao: '03/2022',
        validade: '03/2024',
        quantidade: 40
    },
    { 
        medicamento: 'VALSARTANA',
        composto: 'VALSARTANA 160MG',
        laboratorio: 'GENÉRICO',
        lote: '753951',
        fabricacao: '05/2023',
        validade: '05/2025',
        quantidade: 65
    },
    { 
        medicamento: 'GLIMEPIRIDA',
        composto: 'GLIMEPIRIDA 2MG',
        laboratorio: 'GENÉRICO',
        lote: '456789',
        fabricacao: '07/2022',
        validade: '07/2024',
        quantidade: 55
    },
    { 
        medicamento: 'ONDANSETRONA',
        composto: 'ONDANSETRONA 4MG',
        laboratorio: 'GENÉRICO',
        lote: '987123',
        fabricacao: '09/2022',
        validade: '09/2024',
        quantidade: 70
    },
    { 
        medicamento: 'AMIODARONA',
        composto: 'AMIODARONA 200MG',
        laboratorio: 'GENÉRICO',
        lote: '258963',
        fabricacao: '10/2022',
        validade: '10/2024',
        quantidade: 35
    },
    { 
        medicamento: 'TRIMETOPRIMA',
        composto: 'TRIMETOPRIMA 100MG',
        laboratorio: 'GENÉRICO',
        lote: '147258',
        fabricacao: '11/2022',
        validade: '11/2024',
        quantidade: 60
    },
    { 
        medicamento: 'GABAPENTINA',
        composto: 'GABAPENTINA 300MG',
        laboratorio: 'GENÉRICO',
        lote: '369147',
        fabricacao: '01/2023',
        validade: '01/2025',
        quantidade: 80
    },
    { 
        medicamento: 'CARBAMAZEPINA',
        composto: 'CARBAMAZEPINA 200MG',
        laboratorio: 'GENÉRICO',
        lote: '789963',
        fabricacao: '03/2023',
        validade: '03/2025',
        quantidade: 50
    },
    { 
        medicamento: 'MIRTAZAPINA',
        composto: 'MIRTAZAPINA 30MG',
        laboratorio: 'GENÉRICO',
        lote: '852369',
        fabricacao: '05/2022',
        validade: '05/2024',
        quantidade: 40
    },
    { 
        medicamento: 'DIAZEPAM',
        composto: 'DIAZEPAM 5MG',
        laboratorio: 'GENÉRICO',
        lote: '123789',
        fabricacao: '08/2022',
        validade: '08/2024',
        quantidade: 90
    },
    { 
        medicamento: 'METOPROLOL',
        composto: 'METOPROLOL 100MG',
        laboratorio: 'GENÉRICO',
        lote: '369852',
        fabricacao: '06/2023',
        validade: '06/2025',
        quantidade: 65
    },
    { 
        medicamento: 'BROMAZEPAM',
        composto: 'BROMAZEPAM 3MG',
        laboratorio: 'GENÉRICO',
        lote: '987123',
        fabricacao: '02/2023',
        validade: '02/2025',
        quantidade: 55
    },
    { 
        medicamento: 'SERTRALINA',
        composto: 'SERTRALINA 50MG',
        laboratorio: 'GENÉRICO',
        lote: '123987',
        fabricacao: '07/2022',
        validade: '07/2024',
        quantidade: 75
    },
    { 
        medicamento: 'LEVODOPA',
        composto: 'LEVODOPA 250MG',
        laboratorio: 'GENÉRICO',
        lote: '456321',
        fabricacao: '11/2022',
        validade: '11/2024',
        quantidade: 30
    },
    { 
        medicamento: 'SALBUTAMOL',
        composto: 'SALBUTAMOL 100MCG',
        laboratorio: 'GENÉRICO',
        lote: '987654',
        fabricacao: '09/2022',
        validade: '09/2024',
        quantidade: 85
    },
    { 
        medicamento: 'RIVASTIGMINA',
        composto: 'RIVASTIGMINA 1.5MG',
        laboratorio: 'GENÉRICO',
        lote: '741852',
        fabricacao: '04/2023',
        validade: '04/2025',
        quantidade: 40
    },
    { 
        medicamento: 'DONEPEZILA',
        composto: 'DONEPEZILA 5MG',
        laboratorio: 'GENÉRICO',
        lote: '852741',
        fabricacao: '08/2022',
        validade: '08/2024',
        quantidade: 50
    },
    { 
        medicamento: 'RANITIDINA',
        composto: 'RANITIDINA 150MG',
        laboratorio: 'GENÉRICO',
        lote: '369852',
        fabricacao: '12/2022',
        validade: '12/2024',
        quantidade: 70
    },
    { 
        medicamento: 'CLORIDRATO DE TERBINAFINA',
        composto: 'CLORIDRATO DE TERBINAFINA 250MG',
        laboratorio: 'GENÉRICO',
        lote: '258963',
        fabricacao: '05/2023',
        validade: '05/2025',
        quantidade: 60
    },
    { 
        medicamento: 'FLUCONAZOL',
        composto: 'FLUCONAZOL 150MG',
        laboratorio: 'GENÉRICO',
        lote: '147258',
        fabricacao: '02/2023',
        validade: '02/2025',
        quantidade: 90
    },
    { 
        medicamento: 'CLORIDRATO DE DOXAZOSINA',
        composto: 'CLORIDRATO DE DOXAZOSINA 2MG',
        laboratorio: 'GENÉRICO',
        lote: '963852',
        fabricacao: '10/2022',
        validade: '10/2024',
        quantidade: 45
    },
    { 
        medicamento: 'CLORIDRATO DE TRAZODONA',
        composto: 'CLORIDRATO DE TRAZODONA 100MG',
        laboratorio: 'GENÉRICO',
        lote: '753951',
        fabricacao: '01/2023',
        validade: '01/2025',
        quantidade: 55
    },
    { 
        medicamento: 'CLORIDRATO DE BUPROPIONA',
        composto: 'CLORIDRATO DE BUPROPIONA 150MG',
        laboratorio: 'GENÉRICO',
        lote: '369147',
        fabricacao: '07/2022',
        validade: '07/2024',
        quantidade: 75
    },
    { 
        medicamento: 'CLORIDRATO DE METADONA',
        composto: 'CLORIDRATO DE METADONA 10MG',
        laboratorio: 'GENÉRICO',
        lote: '258369',
        fabricacao: '09/2022',
        validade: '09/2024',
        quantidade: 30
    },
    { 
        medicamento: 'CLORIDRATO DE BENAZEPRIL',
        composto: 'CLORIDRATO DE BENAZEPRIL 5MG',
        laboratorio: 'GENÉRICO',
        lote: '147258',
        fabricacao: '03/2023',
        validade: '03/2025',
        quantidade: 65
    },
    { 
        medicamento: 'CLORIDRATO DE CIPROTERONA',
        composto: 'CLORIDRATO DE CIPROTERONA 2MG',
        laboratorio: 'GENÉRICO',
        lote: '963852',
        fabricacao: '06/2023',
        validade: '06/2025',
        quantidade: 40
    },
    { 
        medicamento: 'CLORIDRATO DE LOPERAMIDA',
        composto: 'CLORIDRATO DE LOPERAMIDA 2MG',
        laboratorio: 'GENÉRICO',
        lote: '753951',
        fabricacao: '04/2022',
        validade: '04/2024',
        quantidade: 50
    },
    { 
        medicamento: 'CLORIDRATO DE DULOXETINA',
        composto: 'CLORIDRATO DE DULOXETINA 30MG',
        laboratorio: 'GENÉRICO',
        lote: '369147',
        fabricacao: '08/2023',
        validade: '08/2025',
        quantidade: 80
    },
    { 
        medicamento: 'CLORIDRATO DE SERTRALINA',
        composto: 'CLORIDRATO DE SERTRALINA 50MG',
        laboratorio: 'GENÉRICO',
        lote: '258369',
        fabricacao: '12/2022',
        validade: '12/2024',
        quantidade: 60
    },
    { 
        medicamento: 'CLORIDRATO DE MIRTAZAPINA',
        composto: 'CLORIDRATO DE MIRTAZAPINA 30MG',
        laboratorio: 'GENÉRICO',
        lote: '147258',
        fabricacao: '01/2023',
        validade: '01/2025',
        quantidade: 45
    },
    { 
        medicamento: 'CLORIDRATO DE RANITIDINA',
        composto: 'CLORIDRATO DE RANITIDINA 150MG',
        laboratorio: 'GENÉRICO',
        lote: '963852',
        fabricacao: '09/2022',
        validade: '09/2024',
        quantidade: 55
    },
    { 
        medicamento: 'CLORIDRATO DE AMITRIPTILINA',
        composto: 'CLORIDRATO DE AMITRIPTILINA 25MG',
        laboratorio: 'GENÉRICO',
        lote: '753951',
        fabricacao: '07/2022',
        validade: '07/2024',
        quantidade: 65
    },
    { 
        medicamento: 'CLORIDRATO DE FEXOFENADINA',
        composto: 'CLORIDRATO DE FEXOFENADINA 120MG',
        laboratorio: 'GENÉRICO',
        lote: '369147',
        fabricacao: '11/2022',
        validade: '11/2024',
        quantidade: 70
    },
    { 
        medicamento: 'CLORIDRATO DE METOCLOPRAMIDA',
        composto: 'CLORIDRATO DE METOCLOPRAMIDA 10MG',
        laboratorio: 'GENÉRICO',
        lote: '258369',
        fabricacao: '05/2023',
        validade: '05/2025',
        quantidade: 85
    },
    { 
        medicamento: 'CLORIDRATO DE TIZANIDINA',
        composto: 'CLORIDRATO DE TIZANIDINA 2MG',
        laboratorio: 'GENÉRICO',
        lote: '147258',
        fabricacao: '03/2023',
        validade: '03/2025',
        quantidade: 40
    },
];

module.exports = estoque;
