import tkinter as tk
from tkinter import messagebox
from tkinter import simpledialog
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.pdfgen import canvas
import requests
import os
from datetime import datetime

# Configuración de la base de datos RestDB
API_URL = "https://registros-3feb.restdb.io/rest/documentos"
API_KEY = "67a9d73e020c06b382e65386"

# Función para validar el formato de la fecha
def validar_fecha(fecha_str):
    try:
        # Intentamos convertir la fecha al formato deseado (YYYY-MM-DD)
        fecha = datetime.strptime(fecha_str, "%Y-%m-%d")
        return fecha.strftime("%Y-%m-%d")
    except ValueError:
        messagebox.showwarning("Fecha Inválida", "Por favor ingresa la fecha en el formato YYYY-MM-DD.")
        return None

# Función para agregar documento a la base de datos
def agregar_documento():
    cliente = entry_cliente.get()
    documento = entry_documento.get()
    responsable = entry_responsable.get()
    fecha = entry_fecha.get()

    if not cliente or not documento or not responsable or not fecha:
        messagebox.showwarning("Campos Vacíos", "Por favor, completa todos los campos.")
        return

    # Validar la fecha antes de agregarla
    fecha_valida = validar_fecha(fecha)
    if not fecha_valida:
        return

    # Crear el diccionario de datos para el documento
    data = {
        "cliente": cliente,
        "documento": documento,
        "responsable": responsable,
        "fecha": fecha_valida,  # Usamos la fecha validada
    }

    # Enviar datos a RestDB usando la API
    headers = {
        'Content-Type': 'application/json',
        'x-apikey': API_KEY
    }

    try:
        response = requests.post(API_URL, json=data, headers=headers)
        if response.status_code == 201:
            messagebox.showinfo("Éxito", "Documento agregado exitosamente.")
            actualizar_lista()  # Actualizar la lista de documentos
            
            # Limpiar los campos después de agregar el documento
            entry_cliente.delete(0, tk.END)
            entry_documento.delete(0, tk.END)
            entry_responsable.delete(0, tk.END)
            entry_fecha.delete(0, tk.END)
        else:
            messagebox.showerror("Error", "Hubo un problema al agregar el documento.")
    except Exception as e:
        messagebox.showerror("Error de Conexión", f"No se pudo conectar con la base de datos: {e}")

# Función para actualizar la lista de registros
def actualizar_lista():
    try:
        response = requests.get(API_URL, headers={'x-apikey': API_KEY})
        if response.status_code == 200:
            registros = response.json()
            listbox_registros.delete(0, tk.END)  # Limpiar la lista antes de agregar nuevos
            for registro in registros:
                cliente = registro.get("cliente", "No especificado")
                documento = registro.get("documento", "No especificado")
                responsable = registro.get("responsable", "No especificado")
                fecha = registro.get("fecha", "No especificado")
                listbox_registros.insert(tk.END, f"{cliente} - {documento} - {responsable} - {fecha}")
        else:
            messagebox.showerror("Error", "Hubo un problema al obtener los registros.")
    except Exception as e:
        messagebox.showerror("Error de Conexión", f"No se pudo conectar con la base de datos: {e}")
    

# Función para editar un documento
def editar_documento():
    try:
        seleccion = listbox_registros.curselection()
        if not seleccion:
            messagebox.showwarning("Selección vacía", "Por favor, selecciona un registro para editar.")
            return

        index = seleccion[0]
        registro = listbox_registros.get(index).split(" - ")
        cliente, documento, responsable, fecha = registro[0], registro[1], registro[2], registro[3]

        # Pedir al usuario que edite los campos
        cliente = simpledialog.askstring("Cliente", f"Editar Cliente (actual: {cliente}):", initialvalue=cliente)
        if not cliente:
            return

        documento = simpledialog.askstring("Documento", f"Editar Documento (actual: {documento}):", initialvalue=documento)
        if not documento:
            return

        responsable = simpledialog.askstring("Responsable", f"Editar Responsable (actual: {responsable}):", initialvalue=responsable)
        if not responsable:
            return

        fecha = simpledialog.askstring("Fecha", f"Editar Fecha (actual: {fecha}):", initialvalue=fecha)
        if not fecha:
            return

        # Crear el registro actualizado
        registro_actualizado = {
            "cliente": cliente,
            "documento": documento,
            "responsable": responsable,
            "fecha": fecha
        }

        # Obtener el ID del registro seleccionado para actualizarlo
        id_registro = seleccion[0]

        # Actualizar el registro en RestDB
        response = requests.put(f"{API_URL}/{id_registro}", json=registro_actualizado, headers={'x-apikey': API_KEY})
        if response.status_code == 200:
            messagebox.showinfo("Éxito", "Documento editado exitosamente.")
            actualizar_lista()  # Actualizar la lista de registros
        else:
            messagebox.showerror("Error", "No se pudo editar el documento.")
    except Exception as e:
        messagebox.showerror("Error", f"No se pudo conectar a la base de datos: {e}")

# Función para eliminar documento de la base de datos
def eliminar_documento():
    # Obtener el registro seleccionado de la lista
    seleccion = listbox_registros.curselection()
    if not seleccion:
        messagebox.showwarning("Selección vacía", "Por favor, selecciona un registro para eliminar.")
        return
    
    # Obtener el registro seleccionado
    index = seleccion[0]
    registro = listbox_registros.get(index).split(" - ")
    cliente, documento, responsable, fecha = registro[0], registro[1], registro[2], registro[3]
    
    # Buscar el documento en la base de datos usando la API de RestDB
    headers = {
        'x-apikey': API_KEY
    }

    # Buscar el documento en la base de datos para obtener su _id
    try:
        response = requests.get(API_URL, headers=headers)
        if response.status_code == 200:
            registros = response.json()
            # Buscar el documento por cliente y documento
            documento_id = None
            for reg in registros:
                if reg["cliente"] == cliente and reg["documento"] == documento:
                    documento_id = reg["_id"]
                    break
            
            if documento_id:
                # Eliminar el documento usando su _id
                delete_url = f"{API_URL}/{documento_id}"
                delete_response = requests.delete(delete_url, headers=headers)
                if delete_response.status_code == 200:
                    messagebox.showinfo("Éxito", "Documento eliminado exitosamente.")
                    actualizar_lista()
                else:
                    messagebox.showerror("Error", "Hubo un problema al eliminar el documento.")
            else:
                messagebox.showwarning("No encontrado", "No se encontró el documento en la base de datos.")
        else:
            messagebox.showerror("Error", "Hubo un problema al obtener los registros.")
    except Exception as e:
        messagebox.showerror("Error de Conexión", f"No se pudo conectar con la base de datos: {e}")

# Función para crear el PDF con plantilla y cuadros para firma o sello
def crear_pdf():
    try:
        # Obtener el registro seleccionado de la lista
        seleccion = listbox_registros.curselection()
        if not seleccion:
            messagebox.showwarning("Selección vacía", "Por favor, selecciona un registro.")
            return
        
        # Obtener los datos del registro seleccionado
        index = seleccion[0]
        registro = listbox_registros.get(index).split(" - ")
        cliente, documento, responsable, fecha = registro[0], registro[1], registro[2], registro[3]

        # Extraer la fecha en formato YYYY-MM-DD (sin la hora ni el sufijo 'Z')
        try:
            fecha_obj = datetime.strptime(fecha.split("T")[0], "%Y-%m-%d")
            fecha_formateada = fecha_obj.strftime("%d-%b-%Y")
        except ValueError:
            messagebox.showerror("Error de Fecha", "La fecha no tiene el formato correcto (YYYY-MM-DD).")
            return

        # Ruta específica donde guardar los PDF
        directorio_destino = r"G:\APLICACIONES\PDF-REGISTRO"

        # Verificar si la carpeta existe, si no, crearla
        if not os.path.exists(directorio_destino):
            os.makedirs(directorio_destino)

        # Crear el nombre del archivo PDF con el formato cliente_documento_fecha
        filename = f"{cliente}_{documento}_{fecha_formateada}.pdf"
        filepath = os.path.join(directorio_destino, filename)

        # Crear el PDF con un diseño
        c = canvas.Canvas(filepath, pagesize=letter)

        # Encabezado
        c.setFont("Helvetica-Bold", 16)
        c.setFillColor(colors.black)
        c.drawString(200, 750, "Registro de Documento")

        # Línea divisoria
        c.setLineWidth(1)
        c.setStrokeColor(colors.grey)
        c.line(30, 740, 580, 740)

        # Datos del registro
        c.setFont("Helvetica", 12)
        c.drawString(30, 700, f"Cliente: {cliente}")
        c.drawString(30, 680, f"Documento: {documento}")
        c.drawString(30, 660, f"Responsable: {responsable}")
        c.drawString(30, 640, f"Fecha: {fecha_formateada}")

        # Detalles adicionales
        c.setFont("Helvetica", 10)
        c.setFillColor(colors.grey)
        c.drawString(30, 600, "Este es un documento generado automáticamente. Por favor, manténgalo en un lugar seguro.")

        # Cuadro para firma o sello (parte inferior izquierda)
        c.setStrokeColor(colors.black)
        c.setLineWidth(1)
        c.rect(30, 250, 200, 150)
        c.setFont("Helvetica", 10)
        c.drawString(40, 270, "Firma / Sello Oficina")

        # Cuadro para firma o sello (parte inferior derecha)
        c.rect(350, 250, 200, 150)
        c.drawString(360, 270, "Firma / Sello Cleinte")

        # Guardar el PDF
        c.save()

        messagebox.showinfo("Éxito", f"PDF creado con éxito: {filename}")
    except Exception as e:
        messagebox.showerror("Error", f"No se pudo crear el PDF: {e}")


# Crear la ventana principal
ventana = tk.Tk()
ventana.title("Registro de Documentos")

# Crear los marcos para las columnas
frame_izquierda = tk.Frame(ventana)
frame_izquierda.grid(row=0, column=0, padx=20, pady=20)

frame_derecha = tk.Frame(ventana)
frame_derecha.grid(row=0, column=1, padx=20, pady=20)

# Campos de entrada (Formulario en la columna de la izquierda)
tk.Label(frame_izquierda, text="Cliente:").grid(row=0, column=0)
entry_cliente = tk.Entry(frame_izquierda)
entry_cliente.grid(row=0, column=1)

tk.Label(frame_izquierda, text="Documento:").grid(row=1, column=0)
entry_documento = tk.Entry(frame_izquierda)
entry_documento.grid(row=1, column=1)

tk.Label(frame_izquierda, text="Responsable:").grid(row=2, column=0)
entry_responsable = tk.Entry(frame_izquierda)
entry_responsable.grid(row=2, column=1)

tk.Label(frame_izquierda, text="Fecha (YYYY-MM-DD):").grid(row=3, column=0)
entry_fecha = tk.Entry(frame_izquierda)
entry_fecha.grid(row=3, column=1)

# Botones en la columna de la izquierda
btn_agregar = tk.Button(frame_izquierda, text="Agregar Documento", command=agregar_documento)
btn_agregar.grid(row=4, column=0, columnspan=2, pady=5)

btn_editar = tk.Button(frame_izquierda, text="Editar Documento", command=editar_documento)
btn_editar.grid(row=5, column=0, columnspan=2, pady=5)

btn_eliminar = tk.Button(frame_izquierda, text="Eliminar Documento", command=eliminar_documento)
btn_eliminar.grid(row=6, column=0, columnspan=2, pady=5)

btn_pdf = tk.Button(frame_izquierda, text="Generar PDF", command=crear_pdf)
btn_pdf.grid(row=7, column=0, columnspan=2, pady=5)

# Listbox en la columna de la derecha para mostrar los registros
listbox_registros = tk.Listbox(frame_derecha, width=50, height=15)
listbox_registros.grid(row=0, column=0)

# Botón para actualizar la lista
btn_actualizar = tk.Button(frame_derecha, text="Actualizar Lista", command=actualizar_lista)
btn_actualizar.grid(row=1, column=0, pady=5)

# Iniciar la aplicación
actualizar_lista()
ventana.mainloop()
