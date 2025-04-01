export const Registro = () => {
    return `
        <div class="page-header">
            <h3 class="animated-title">REGISTRO DE DOCUMENTOS</h3>
            <div class="header-underline"></div>
        </div>
        <div class="card shadow-sm p-4 mt-4">
            <h5 class="card-title mb-3">Nuevo registro</h5>
            <div class="row mb-3">
                <div class="col-md-6">
                    <div class="mb-3">
                        <label for="cliente" class="form-label">Cliente</label>
                        <input type="text" class="form-control" id="cliente" placeholder="Nombre del cliente">
                    </div>
                    <div class="mb-3">
                        <label for="documento" class="form-label">Documento</label>
                        <input type="text" class="form-control" id="documento" placeholder="Tipo o número de documento">
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="mb-3">
                        <label for="responsable" class="form-label">Responsable</label>
                        <input type="text" class="form-control" id="responsable" placeholder="Nombre del responsable">
                    </div>
                    <div class="mb-3">
                        <label for="fecha" class="form-label">Fecha (YYYY-MM-DD)</label>
                        <input type="date" class="form-control" id="fecha">
                    </div>
                </div>
            </div>
            <div class="d-flex justify-content-end mt-3">
                <button class="btn btn-primary" id="btnAgregarDocumento">Agregar documento</button>
            </div>
        </div>
        <div class="card shadow-sm p-4 mt-4">
            <div class="d-flex justify-content-between align-items-center mb-3">
                <h5 class="card-title mb-0">Documentos registrados</h5>
                <button class="btn btn-outline-secondary" id="btnActualizarLista">
                    <i class="fas fa-sync-alt me-2"></i>Actualizar lista
                </button>
            </div>
            <div class="table-responsive">
                <table class="table table-hover" id="tablaDocumentos">
                    <thead>
                        <tr>
                            <th>Cliente</th>
                            <th>Documento</th>
                            <th>Responsable</th>
                            <th>Fecha</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody id="tbodyDocumentos">
                        <!-- Los documentos se cargarán dinámicamente -->
                    </tbody>
                </table>
            </div>
            <div id="spinnerCarga" class="text-center mt-4 mb-4 d-none">
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Cargando...</span>
                </div>
                <p class="mt-2">Cargando documentos...</p>
            </div>
            <div id="mensajeNoRegistros" class="alert alert-info mt-3 d-none">
                No hay documentos registrados. Agrega uno nuevo para comenzar.
            </div>
        </div>

        <!-- Modal para editar documento -->
        <div class="modal fade" id="editarDocumentoModal" tabindex="-1" aria-labelledby="editarDocumentoModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="editarDocumentoModalLabel">Editar documento</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <input type="hidden" id="documentoIdEditar">
                        <div class="mb-3">
                            <label for="clienteEditar" class="form-label">Cliente</label>
                            <input type="text" class="form-control" id="clienteEditar">
                        </div>
                        <div class="mb-3">
                            <label for="documentoEditar" class="form-label">Documento</label>
                            <input type="text" class="form-control" id="documentoEditar">
                        </div>
                        <div class="mb-3">
                            <label for="responsableEditar" class="form-label">Responsable</label>
                            <input type="text" class="form-control" id="responsableEditar">
                        </div>
                        <div class="mb-3">
                            <label for="fechaEditar" class="form-label">Fecha (YYYY-MM-DD)</label>
                            <input type="date" class="form-control" id="fechaEditar">
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                        <button type="button" class="btn btn-primary" id="btnGuardarEdicion">Guardar cambios</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal de confirmación para eliminar -->
        <div class="modal fade" id="confirmarEliminarModal" tabindex="-1" aria-labelledby="confirmarEliminarModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="confirmarEliminarModalLabel">Confirmar eliminación</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <p>¿Estás seguro de que deseas eliminar este documento?</p>
                        <p><strong>Cliente:</strong> <span id="clienteEliminar"></span></p>
                        <p><strong>Documento:</strong> <span id="documentoEliminar"></span></p>
                        <input type="hidden" id="documentoIdEliminar">
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                        <button type="button" class="btn btn-danger" id="btnConfirmarEliminar">Eliminar</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Toast para mensajes -->
        <div class="position-fixed bottom-0 end-0 p-3" style="z-index: 11">
            <div id="liveToast" class="toast hide" role="alert" aria-live="assertive" aria-atomic="true">
                <div class="toast-header">
                    <strong class="me-auto" id="toastTitle">Notificación</strong>
                    <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
                <div class="toast-body" id="toastMessage">
                </div>
            </div>
        </div>
    `;
};

export const setupRegistro = () => {
    const API_URL = "https://registros-3feb.restdb.io/rest/documentos";
    const API_KEY = "67a9d73e020c06b382e65386";

    let documentos = [];

    const btnAgregarDocumento = document.getElementById('btnAgregarDocumento');
    const btnActualizarLista = document.getElementById('btnActualizarLista');
    const tbodyDocumentos = document.getElementById('tbodyDocumentos');
    const spinnerCarga = document.getElementById('spinnerCarga');
    const mensajeNoRegistros = document.getElementById('mensajeNoRegistros');
    const btnGuardarEdicion = document.getElementById('btnGuardarEdicion');
    const btnConfirmarEliminar = document.getElementById('btnConfirmarEliminar');

    // Función para mostrar toast (mensaje)
    function mostrarToast(titulo, mensaje, tipo = 'bg-success') {
        const toastEl = document.getElementById('liveToast');
        const toastTitle = document.getElementById('toastTitle');
        const toastMessage = document.getElementById('toastMessage');

        toastTitle.textContent = titulo;
        toastMessage.textContent = mensaje;

        toastEl.classList.remove('bg-success', 'bg-danger', 'bg-warning', 'bg-info');
        if (tipo) {
            toastEl.classList.add(tipo);
        }

        const toast = new bootstrap.Toast(toastEl);
        toast.show();
    }

    // Validar formato de fecha
    function validarFecha(fechaStr) {
        try {
            const regex = /^\d{4}-\d{2}-\d{2}$/;
            if (!regex.test(fechaStr)) {
                return null;
            }

            const fecha = new Date(fechaStr);
            if (isNaN(fecha.getTime())) {
                return null;
            }

            return fechaStr;
        } catch (e) {
            return null;
        }
    }

    // Función para cargar la lista de documentos
    function cargarDocumentos() {
        spinnerCarga.classList.remove('d-none');
        mensajeNoRegistros.classList.add('d-none');

        fetch(API_URL, {
            method: 'GET',
            headers: {
                'x-apikey': API_KEY
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al obtener documentos');
            }
            return response.json();
        })
        .then(data => {
            documentos = data;
            renderizarDocumentos();
            spinnerCarga.classList.add('d-none');

            if (documentos.length === 0) {
                mensajeNoRegistros.classList.remove('d-none');
            }
        })
        .catch(error => {
            spinnerCarga.classList.add('d-none');
            mostrarToast('Error', error.message, 'bg-danger');
        });
    }

    // Función para renderizar los documentos en la tabla
    function renderizarDocumentos() {
        tbodyDocumentos.innerHTML = '';

        documentos.forEach(doc => {
            const tr = document.createElement('tr');

            let fechaMostrar = doc.fecha;
            if (fechaMostrar && fechaMostrar.includes('T')) {
                fechaMostrar = fechaMostrar.split('T')[0];
            }

            tr.innerHTML = `
                <td>${doc.cliente || '-'}</td>
                <td>${doc.documento || '-'}</td>
                <td>${doc.responsable || '-'}</td>
                <td>${fechaMostrar || '-'}</td>
                <td>
                    <div class="btn-group">
                        <button class="btn btn-sm btn-outline-info btn-editar" data-id="${doc._id}">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn btn-sm btn-outline-danger btn-eliminar" data-id="${doc._id}">
                            <i class="fas fa-trash"></i>
                        </button>
                        <button class="btn btn-sm btn-outline-primary btn-pdf" data-id="${doc._id}">
                            <i class="fas fa-file-pdf"></i>
                        </button>
                    </div>
                </td>
            `;

            tbodyDocumentos.appendChild(tr);
        });

        document.querySelectorAll('.btn-editar').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = e.currentTarget.getAttribute('data-id');
                const doc = documentos.find(d => d._id === id);
                if (doc) {
                    document.getElementById('documentoIdEditar').value = doc._id;
                    document.getElementById('clienteEditar').value = doc.cliente || '';
                    document.getElementById('documentoEditar').value = doc.documento || '';
                    document.getElementById('responsableEditar').value = doc.responsable || '';

                    let fechaEditar = doc.fecha;
                    if (fechaEditar && fechaEditar.includes('T')) {
                        fechaEditar = fechaEditar.split('T')[0];
                    }
                    document.getElementById('fechaEditar').value = fechaEditar || '';

                    const modal = new bootstrap.Modal(document.getElementById('editarDocumentoModal'));
                    modal.show();
                }
            });
        });

        document.querySelectorAll('.btn-eliminar').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = e.currentTarget.getAttribute('data-id');
                const doc = documentos.find(d => d._id === id);
                if (doc) {
                    document.getElementById('documentoIdEliminar').value = doc._id;
                    document.getElementById('clienteEliminar').textContent = doc.cliente || '-';
                    document.getElementById('documentoEliminar').textContent = doc.documento || '-';

                    const modal = new bootstrap.Modal(document.getElementById('confirmarEliminarModal'));
                    modal.show();
                }
            });
        });

        document.querySelectorAll('.btn-pdf').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = e.currentTarget.getAttribute('data-id');
                const doc = documentos.find(d => d._id === id);
                if (doc) {
                    generarPDF(doc);
                }
            });
        });
    }

    // Función para generar un PDF con la información del registro
    function generarPDF(doc) {
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF();
    
        // Configuración del PDF
        pdf.setFontSize(18);
        pdf.setFont('helvetica', 'bold');
        pdf.text("Detalles del Documento", 10, 20);
    
        // Información del Registro
        pdf.setFontSize(12);
        pdf.setFont('helvetica', 'normal');
        pdf.text(`Cliente: ${doc.cliente || '-'}`, 10, 30);
        pdf.text(`Documento: ${doc.documento || '-'}`, 10, 40);
        pdf.text(`Responsable: ${doc.responsable || '-'}`, 10, 50);
    
        let fechaMostrar = doc.fecha;
        if (fechaMostrar && fechaMostrar.includes('T')) {
            fechaMostrar = fechaMostrar.split('T')[0];
        }
        pdf.text(`Fecha: ${fechaMostrar || '-'}`, 10, 60);
    
        // Crear recuadros para firmar con tamaños más grandes
        const firmaYPos = 80;
        const firmaAltura = 30; // Altura mayor para mayor espacio para firmar
        const firmaAncho = 90; // Ancho mayor para más espacio
    
        // Recuadro para firma 1
        pdf.rect(10, firmaYPos, firmaAncho, firmaAltura); // Coordenadas (x, y), ancho y alto
        pdf.text('Firma del Cliente', 15, firmaYPos + 15); // Ajuste de posición dentro del recuadro
        
        // Recuadro para firma 2
        pdf.rect(10 + firmaAncho + 10, firmaYPos, firmaAncho, firmaAltura); // Coordenadas ajustadas
        pdf.text('Firma del Responsable', 15 + firmaAncho + 10, firmaYPos + 15);
    
        // Separador de sección (opcional)
        pdf.line(10, firmaYPos + firmaAltura + 5, 200, firmaYPos + firmaAltura + 5); // Línea horizontal
    
        // Crear el nombre del archivo en el formato FECHA_DOCUMENTO_CLIENTE
        const fecha = doc.fecha ? doc.fecha.split('T')[0] : 'sin_fecha';
        const documento = doc.documento || 'sin_documento';
        const cliente = doc.cliente || 'sin_cliente';
        
        // Guardar el PDF con el formato deseado
        const nombreArchivo = `${fecha}_${documento}_${cliente}.pdf`;
        pdf.save(nombreArchivo);
    
        // Mostrar mensaje de éxito
        mostrarToast('Éxito', 'PDF generado correctamente', 'bg-success');
    }    
    
    // Función para agregar documento
    function agregarDocumento() {
        const cliente = document.getElementById('cliente').value.trim();
        const documento = document.getElementById('documento').value.trim();
        const responsable = document.getElementById('responsable').value.trim();
        const fecha = document.getElementById('fecha').value;

        if (!cliente || !documento || !responsable || !fecha) {
            mostrarToast('Error', 'Por favor, completa todos los campos', 'bg-danger');
            return;
        }

        const fechaValida = validarFecha(fecha);
        if (!fechaValida) {
            mostrarToast('Error', 'El formato de la fecha debe ser YYYY-MM-DD', 'bg-danger');
            return;
        }

        const data = {
            cliente,
            documento,
            responsable,
            fecha: fechaValida
        };

        fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-apikey': API_KEY
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al agregar documento');
            }
            return response.json();
        })
        .then(() => {
            mostrarToast('Éxito', 'Documento agregado exitosamente');

            document.getElementById('cliente').value = '';
            document.getElementById('documento').value = '';
            document.getElementById('responsable').value = '';
            document.getElementById('fecha').value = '';

            cargarDocumentos();
        })
        .catch(error => {
            mostrarToast('Error', error.message, 'bg-danger');
        });
    }

    // Función para editar documento
    function editarDocumento() {
        const id = document.getElementById('documentoIdEditar').value;
        const cliente = document.getElementById('clienteEditar').value.trim();
        const documento = document.getElementById('documentoEditar').value.trim();
        const responsable = document.getElementById('responsableEditar').value.trim();
        const fecha = document.getElementById('fechaEditar').value;

        if (!cliente || !documento || !responsable || !fecha) {
            mostrarToast('Error', 'Por favor, completa todos los campos', 'bg-danger');
            return;
        }

        const fechaValida = validarFecha(fecha);
        if (!fechaValida) {
            mostrarToast('Error', 'El formato de la fecha debe ser YYYY-MM-DD', 'bg-danger');
            return;
        }

        const data = {
            cliente,
            documento,
            responsable,
            fecha: fechaValida
        };

        fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'x-apikey': API_KEY
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al actualizar documento');
            }
            return response.json();
        })
        .then(() => {
            mostrarToast('Éxito', 'Documento actualizado exitosamente');

            const modal = bootstrap.Modal.getInstance(document.getElementById('editarDocumentoModal'));
            modal.hide();

            cargarDocumentos();
        })
        .catch(error => {
            mostrarToast('Error', error.message, 'bg-danger');
        });
    }

    // Función para eliminar documento
    function eliminarDocumento() {
        const id = document.getElementById('documentoIdEliminar').value;

        fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
            headers: {
                'x-apikey': API_KEY
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al eliminar documento');
            }
            return response.json();
        })
        .then(() => {
            mostrarToast('Éxito', 'Documento eliminado exitosamente');

            const modal = bootstrap.Modal.getInstance(document.getElementById('confirmarEliminarModal'));
            modal.hide();

            cargarDocumentos();
        })
        .catch(error => {
            mostrarToast('Error', error.message, 'bg-danger');
        });
    }

    // Configurar eventos
    btnAgregarDocumento.addEventListener('click', agregarDocumento);
    btnActualizarLista.addEventListener('click', cargarDocumentos);
    btnGuardarEdicion.addEventListener('click', editarDocumento);
    btnConfirmarEliminar.addEventListener('click', eliminarDocumento);

    // Cargar los documentos al inicializar
    cargarDocumentos();
};