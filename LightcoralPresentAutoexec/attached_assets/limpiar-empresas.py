import os
import pandas as pd

# Leer el archivo Excel con los nombres de los clientes
excel_file = 'G:\11. USUARIOS\20. JOAQUIN\TAREAS - 08-11-24\JOAQUIN_LISTADO_EMPRESAS'
df = pd.read_excel(excel_file)

# Suponiendo que la columna con los nombres de los clientes se llama 'Cliente'
clientes_excel = df['Cliente'].tolist()

# Leer los nombres de las carpetas del directorio
carpeta_base = 'ruta/a/tu/carpeta'
carpetas = [nombre for nombre in os.listdir(carpeta_base) if os.path.isdir(os.path.join(carpeta_base, nombre))]

# Clasificar los clientes en las 3 categorías
solo_excel = set(clientes_excel) - set(carpetas)
solo_carpeta = set(carpetas) - set(clientes_excel)
en_ambos = set(clientes_excel) & set(carpetas)

# Mostrar los resultados
print("Clientes en el Excel pero no en la carpeta:")
print(solo_excel)

print("\nClientes en la carpeta pero no en el Excel:")
print(solo_carpeta)

print("\nClientes en ambos (Excel y carpeta):")
print(en_ambos)

