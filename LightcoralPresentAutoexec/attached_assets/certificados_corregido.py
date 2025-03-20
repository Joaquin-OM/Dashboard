import os
import pandas as pd
import difflib
import tkinter as tk
from tkinter import filedialog, messagebox

# Función para obtener los nombres de clientes desde varias columnas del Excel
def obtener_nombres_clientes(archivo_excel, columnas):
    df = pd.read_excel(archivo_excel)
    nombres = []
    
    # Iterar por cada columna especificada
    for columna in columnas:
        if columna in df.columns:
            nombres.extend(df[columna].dropna().tolist())  # Añadir los nombres sin NaN
        
    return nombres

# Función para revisar archivos no renombrados buscando coincidencias
def revisar_coincidencias(archivos, nombres_clientes, umbral_similitud=0.3):
    coincidencias = []
    
    for archivo in archivos:
        nombre_archivo, extension = os.path.splitext(archivo)
        coincidencia = difflib.get_close_matches(nombre_archivo, nombres_clientes, n=1, cutoff=umbral_similitud)
        
        if coincidencia:
            coincidencias.append((archivo, coincidencia[0]))
    
    return coincidencias

# Función para ejecutar el proceso de comparación
def ejecutar_comparacion():
    archivo_excel = entry_excel.get()
    carpeta_archivos = entry_carpeta.get()
    columnas = entry_columnas.get().split(",")  # Separar las columnas por comas
    
    if not archivo_excel or not carpeta_archivos or not columnas:
        messagebox.showwarning("Advertencia", "Por favor, rellene todos los campos")
        return
    
    try:
        # Obtener los nombres de los clientes desde las columnas del Excel
        nombres_clientes = obtener_nombres_clientes(archivo_excel, columnas)
        
        # Obtener la lista de archivos en la carpeta
        archivos = os.listdir(carpeta_archivos)
        
        # Revisar coincidencias
        coincidencias = revisar_coincidencias(archivos, nombres_clientes)
        
        if coincidencias:
            mensaje_coincidencias = "\n".join([f"{archivo} -> {nombre_cliente}" for archivo, nombre_cliente in coincidencias])
            messagebox.showinfo("Coincidencias Encontradas", f"Se encontraron las siguientes coincidencias:\n{mensaje_coincidencias}")
        else:
            messagebox.showinfo("Sin Coincidencias", "No se encontraron coincidencias en los archivos.")
    except Exception as e:
        messagebox.showerror("Error", f"Ha ocurrido un error: {e}")

# Crear la interfaz gráfica
root = tk.Tk()
root.title("Comparar Archivos por Coincidencia")

# Etiquetas y entradas para el archivo Excel, carpeta y columnas
label_excel = tk.Label(root, text="Archivo Excel:")
label_excel.grid(row=0, column=0, padx=10, pady=10)
entry_excel = tk.Entry(root, width=40)
entry_excel.grid(row=0, column=1, padx=10, pady=10)
button_excel = tk.Button(root, text="Seleccionar Excel", command=lambda: entry_excel.insert(0, filedialog.askopenfilename(filetypes=[("Archivos Excel", "*.xlsx")])))
button_excel.grid(row=0, column=2, padx=10, pady=10)

label_carpeta = tk.Label(root, text="Carpeta de Archivos:")
label_carpeta.grid(row=1, column=0, padx=10, pady=10)
entry_carpeta = tk.Entry(root, width=40)
entry_carpeta.grid(row=1, column=1, padx=10, pady=10)
button_carpeta = tk.Button(root, text="Seleccionar Carpeta", command=lambda: entry_carpeta.insert(0, filedialog.askdirectory()))
button_carpeta.grid(row=1, column=2, padx=10, pady=10)

label_columnas = tk.Label(root, text="Columnas de Nombres (separadas por comas):")
label_columnas.grid(row=2, column=0, padx=10, pady=10)
entry_columnas = tk.Entry(root, width=40)
entry_columnas.grid(row=2, column=1, padx=10, pady=10)

# Botón para ejecutar el proceso de comparación
button_comparar = tk.Button(root, text="Comparar Archivos", command=ejecutar_comparacion)
button_comparar.grid(row=3, column=1, padx=10, pady=20)

# Ejecutar el bucle principal de Tkinter
root.mainloop()