export const Envio = () => {
    return `
        <div class="page-header">
            <h3 class="animated-title">ENVÍO DE LISTADOS</h3>
            <div class="header-underline"></div>
        </div>
        <div class="card shadow-sm p-4 mt-4">
            <h5 class="card-title mb-3">Selección y procesamiento de datos</h5>
            <div class="row mb-4">
                <div class="col-md-6">
                    <div class="mb-3">
                        <label for="excelFile" class="form-label">Archivo Excel con datos</label>
                        <input type="file" class="form-control" id="excelFile" accept=".xlsx,.xls">
                        <div class="form-text">Seleccione un archivo Excel con los datos a procesar</div>
                    </div>
                    <div class="mb-3">
                        <label for="columnasDatos" class="form-label">Columnas a incluir (separadas por comas)</label>
                        <input type="text" class="form-control" id="columnasDatos" placeholder="Ej: Nombre, Email, Empresa">
                        <div class="form-text">Indique las columnas del Excel que desea incluir en el listado</div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="mb-3">
                        <label for="filtroValores" class="form-label">Filtrar por valores (opcional)</label>
                        <div class="input-group mb-3">
                            <select class="form-select" id="columnaFiltro">
                                <option selected value="">Seleccionar columna</option>
                            </select>
                            <select class="form-select" id="operadorFiltro">
                                <option selected value="igual">Igual a</option>
                                <option value="contiene">Contiene</option>
                                <option value="mayor">Mayor que</option>
                                <option value="menor">Menor que</option>
                            </select>
                            <input type="text" class="form-control" id="valorFiltro" placeholder="Valor">
                        </div>
                    </div>
                    <div class="mb-3">
                        <label for="ordenarPor" class="form-label">Ordenar por</label>
                        <select class="form-select" id="ordenarPor">
                            <option selected value="">Sin ordenar</option>
                        </select>
                    </div>
                    <div class="form-check mb-3">
                        <input class="form-check-input" type="checkbox" id="ordenDescendente">
                        <label class="form-check-label" for="ordenDescendente">
                            Orden descendente
                        </label>
                    </div>
                </div>
            </div>
            <button class="btn btn-primary" id="btnProcesarDatos">Procesar datos</button>
        </div>
        <div class="card shadow-sm p-4 mt-4" id="cardVistaPrevia" style="display: none;">
            <h5 class="card-title mb-3">Vista previa de datos</h5>
            <div class="table-responsive mb-3" id="vistaPreviaContainer">
                <table class="table table-striped table-hover" id="tablaVistaPrevia">
                    <thead>
                        <tr id="encabezadosTabla">
                            <!-- Los encabezados se generarán dinámicamente -->
                        </tr>
                    </thead>
                    <tbody id="cuerpoTabla">
                        <!-- Los datos se generarán dinámicamente -->
                    </tbody>
                </table>
            </div>
            <div class="d-flex justify-content-end">
                <span class="text-muted me-3">Mostrando <span id="numFilas">0</span> registros</span>
                <button class="btn btn-outline-secondary" id="btnExportarExcel">Exportar a Excel</button>
            </div>
        </div>
        <div class="card shadow-sm p-4 mt-4" id="cardEnvio" style="display: none;">
            <h5 class="card-title mb-3">Configuración de envío</h5>
            <div class="mb-3">
                <label for="asuntoCorreo" class="form-label">Asunto del correo</label>
                <input type="text" class="form-control" id="asuntoCorreo" placeholder="Asunto del correo">
            </div>
            <div class="mb-3">
                <label for="cuerpoCorreo" class="form-label">Cuerpo del mensaje</label>
                <textarea class="form-control" id="cuerpoCorreo" rows="4" placeholder="Escriba el contenido del mensaje..."></textarea>
            </div>
            <div class="card mb-3">
                <div class="card-header">
                    <h6 class="mb-0">Destinatarios</h6>
                </div>
                <div class="card-body">
                    <div class="mb-3">
                        <div class="form-check mb-2">
                            <input class="form-check-input" type="checkbox" id="usarEmailExcel">
                            <label class="form-check-label" for="usarEmailExcel">
                                Usar columna de email del Excel
                            </label>
                        </div>
                        <select class="form-select mb-3" id="columnaEmail" style="display: none;">
                            <option selected value="">Seleccionar columna de email</option>
                        </select>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Añadir destinatarios manualmente</label>
                        <div class="input-group">
                            <input type="email" class="form-control" placeholder="Añadir correo electrónico" id="nuevoDestinatario">
                            <button class="btn btn-primary" type="button" id="btnAgregarDestinatario">Añadir</button>
                        </div>
                    </div>
                    <div class="d-flex flex-wrap gap-2" id="listaDestinatarios">
                        <!-- Los destinatarios se generarán dinámicamente -->
                    </div>
                </div>
            </div>
            <div class="form-check mb-3">
                <input class="form-check-input" type="checkbox" id="adjuntarListado">
                <label class="form-check-label" for="adjuntarListado">
                    Adjuntar listado procesado
                </label>
            </div>
            <div class="mb-3" id="formatoAdjuntoOptions" style="display: none;">
                <label class="form-label">Formato del adjunto</label>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="formatoAdjunto" id="formatoExcel" value="excel" checked>
                    <label class="form-check-label" for="formatoExcel">Excel</label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="formatoAdjunto" id="formatoPDF" value="pdf">
                    <label class="form-check-label" for="formatoPDF">PDF</label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="formatoAdjunto" id="formatoCSV" value="csv">
                    <label class="form-check-label" for="formatoCSV">CSV</label>
                </div>
            </div>
            <div class="form-check mb-3">
                <input class="form-check-input" type="checkbox" id="programarEnvio">
                <label class="form-check-label" for="programarEnvio">
                    Programar envío
                </label>
            </div>
            <div class="row mb-3" id="opcionesProgramacion" style="display: none;">
                <div class="col-md-6">
                    <label for="fechaProgramada" class="form-label">Fecha</label>
                    <input type="date" class="form-control" id="fechaProgramada">
                </div>
                <div class="col-md-6">
                    <label for="horaProgramada" class="form-label">Hora</label>
                    <input type="time" class="form-control" id="horaProgramada">
                </div>
            </div>
            <div class="d-flex justify-content-between">
                <button class="btn btn-outline-secondary" id="btnVolverProcesar">Volver a procesamiento</button>
                <button class="btn btn-primary" id="btnEnviarListado">Enviar listado</button>
            </div>
        </div>
        <div class="card shadow-sm p-4 mt-4">
            <h5 class="card-title mb-3">Historial de envíos</h5>
            <table class="table">
                <thead>
                    <tr>
                        <th>Fecha</th>
                        <th>Asunto</th>
                        <th>Destinatarios</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody id="historialEnvios">
                    <tr>
                        <td>15/05/2023</td>
                        <td>Listado mensual de clientes</td>
                        <td>3 destinatarios</td>
                        <td><span class="badge bg-success">Enviado</span></td>
                        <td>
                            <button class="btn btn-sm btn-outline-primary me-1"><i class="fas fa-eye"></i></button>
                            <button class="btn btn-sm btn-outline-secondary"><i class="fas fa-copy"></i></button>
                        </td>
                    </tr>
                    <tr>
                        <td>01/05/2023</td>
                        <td>Reporte trimestral</td>
                        <td>5 destinatarios</td>
                        <td><span class="badge bg-success">Enviado</span></td>
                        <td>
                            <button class="btn btn-sm btn-outline-primary me-1"><i class="fas fa-eye"></i></button>
                            <button class="btn btn-sm btn-outline-secondary"><i class="fas fa-copy"></i></button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    `;
};

export const setupEnvio = () => {
    let excelData = null;
    let columnasDisponibles = [];
    let datosListado = [];
    let destinatarios = [];

    const excelFile = document.getElementById('excelFile');
    const columnasDatos = document.getElementById('columnasDatos');
    const columnaFiltro = document.getElementById('columnaFiltro');
    const ordenarPor = document.getElementById('ordenarPor');
    const btnProcesarDatos = document.getElementById('btnProcesarDatos');
    const cardVistaPrevia = document.getElementById('cardVistaPrevia');
    const tablaVistaPrevia = document.getElementById('tablaVistaPrevia');
    const encabezadosTabla = document.getElementById('encabezadosTabla');
    const cuerpoTabla = document.getElementById('cuerpoTabla');
    const numFilas = document.getElementById('numFilas');
    const btnExportarExcel = document.getElementById('btnExportarExcel');
    const cardEnvio = document.getElementById('cardEnvio');
    const columnaEmail = document.getElementById('columnaEmail');
    const usarEmailExcel = document.getElementById('usarEmailExcel');
    const nuevoDestinatario = document.getElementById('nuevoDestinatario');
    const btnAgregarDestinatario = document.getElementById('btnAgregarDestinatario');
    const listaDestinatarios = document.getElementById('listaDestinatarios');
    const adjuntarListado = document.getElementById('adjuntarListado');
    const formatoAdjuntoOptions = document.getElementById('formatoAdjuntoOptions');
    const programarEnvio = document.getElementById('programarEnvio');
    const opcionesProgramacion = document.getElementById('opcionesProgramacion');
    const btnVolverProcesar = document.getElementById('btnVolverProcesar');
    const btnEnviarListado = document.getElementById('btnEnviarListado');

    // Función para cargar y procesar el archivo Excel
    async function cargarExcel(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = async function(e) {
                try {
                    if (typeof XLSX === 'undefined') {
                        await loadScript('https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js');
                    }

                    const data = new Uint8Array(e.target.result);
                    const workbook = XLSX.read(data, { type: 'array' });
                    const firstSheetName = workbook.SheetNames[0];
                    const worksheet = workbook.Sheets[firstSheetName];
                    const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

                    if (jsonData.length < 2) {
                        reject(new Error('El archivo Excel no contiene suficientes datos'));
                        return;
                    }

                    const headers = jsonData[0];
                    const rows = jsonData.slice(1);

                    const dataObjects = rows.map(row => {
                        const obj = {};
                        headers.forEach((header, index) => {
                            obj[header] = row[index];
                        });
                        return obj;
                    });

                    resolve({ headers, data: dataObjects });
                } catch (error) {
                    reject(error);
                }
            };
            reader.onerror = reject;
            reader.readAsArrayBuffer(file);
        });
    }

    // Función para cargar scripts externos
    function loadScript(src) {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = src;
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }

    // Función para mostrar toast (mensaje)
    function mostrarToast(titulo, mensaje, tipo = 'bg-success') {
        const toastContainer = document.querySelector('.position-fixed.bottom-0.end-0.p-3');
        let toastEl;

        if (!toastContainer) {
            const newToastContainer = document.createElement('div');
            newToastContainer.className = 'position-fixed bottom-0 end-0 p-3';
            newToastContainer.style.zIndex = '11';
            document.body.appendChild(newToastContainer);

            newToastContainer.innerHTML = `
                <div id="liveToast" class="toast hide" role="alert" aria-live="assertive" aria-atomic="true">
                    <div class="toast-header">
                        <strong class="me-auto" id="toastTitle">Notificación</strong>
                        <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                    </div>
                    <div class="toast-body" id="toastMessage">
                    </div>
                </div>
            `;

            toastEl = document.getElementById('liveToast');
        } else {
            toastEl = document.getElementById('liveToast');
            if (!toastEl) {
                toastContainer.innerHTML = `
                    <div id="liveToast" class="toast hide" role="alert" aria-live="assertive" aria-atomic="true">
                        <div class="toast-header">
                            <strong class="me-auto" id="toastTitle">Notificación</strong>
                            <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                        </div>
                        <div class="toast-body" id="toastMessage">
                        </div>
                    </div>
                `;
                toastEl = document.getElementById('liveToast');
            }
        }

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

    // Actualizar listas desplegables con las columnas disponibles
    function actualizarColumnasDisponibles(headers) {
        columnasDisponibles = headers;

        columnaFiltro.innerHTML = '<option selected value="">Seleccionar columna</option>';
        headers.forEach(header => {
            columnaFiltro.innerHTML += `<option value="${header}">${header}</option>`;
        });

        ordenarPor.innerHTML = '<option selected value="">Sin ordenar</option>';
        headers.forEach(header => {
            ordenarPor.innerHTML += `<option value="${header}">${header}</option>`;
        });

        columnaEmail.innerHTML = '<option selected value="">Seleccionar columna de email</option>';
        headers.forEach(header => {
            columnaEmail.innerHTML += `<option value="${header}">${header}</option>`;
        });
    }

    // Función para filtrar datos según criterios
    function filtrarDatos(data) {
        let datosFiltrados = [...data];

        const colFiltro = columnaFiltro.value;
        const operador = document.getElementById('operadorFiltro').value;
        const valor = document.getElementById('valorFiltro').value;

        if (colFiltro && valor) {
            datosFiltrados = datosFiltrados.filter(row => {
                const valorCelda = row[colFiltro];

                switch (operador) {
                    case 'igual':
                        return valorCelda == valor;
                    case 'contiene':
                        return String(valorCelda).toLowerCase().includes(valor.toLowerCase());
                    case 'mayor':
                        return Number(valorCelda) > Number(valor);
                    case 'menor':
                        return Number(valorCelda) < Number(valor);
                    default:
                        return true;
                }
            });
        }

        const colOrden = ordenarPor.value;
        if (colOrden) {
            const ordenDesc = document.getElementById('ordenDescendente').checked;

            datosFiltrados.sort((a, b) => {
                let valorA = a[colOrden];
                let valorB = b[colOrden];

                if (!isNaN(valorA) && !isNaN(valorB)) {
                    valorA = Number(valorA);
                    valorB = Number(valorB);
                }

                if (ordenDesc) {
                    return valorA > valorB ? -1 : valorA < valorB ? 1 : 0;
                } else {
                    return valorA < valorB ? -1 : valorA > valorB ? 1 : 0;
                }
            });
        }

        return datosFiltrados;
    }

    // Función para mostrar la vista previa de datos
    function mostrarVistaPrevia(headers, data) {
        let columnasSeleccionadas = columnasDatos.value
            .split(',')
            .map(col => col.trim())
            .filter(col => headers.includes(col));

        if (columnasSeleccionadas.length === 0) {
            columnasSeleccionadas = headers;
        }

        encabezadosTabla.innerHTML = '';
        columnasSeleccionadas.forEach(header => {
            encabezadosTabla.innerHTML += `<th>${header}</th>`;
        });

        const datosFiltrados = filtrarDatos(data);

        cuerpoTabla.innerHTML = '';
        datosFiltrados.forEach(row => {
            const tr = document.createElement('tr');

            columnasSeleccionadas.forEach(header => {
                const td = document.createElement('td');
                td.textContent = row[header] !== undefined ? row[header] : '';
                tr.appendChild(td);
            });

            cuerpoTabla.appendChild(tr);
        });

        numFilas.textContent = datosFiltrados.length;

        datosListado = datosFiltrados.map(row => {
            const newRow = {};
            columnasSeleccionadas.forEach(header => {
                newRow[header] = row[header];
            });
            return newRow;
        });

        cardVistaPrevia.style.display = 'block';
        cardEnvio.style.display = 'block';
    }

    // Función para agregar un destinatario a la lista
    function agregarDestinatario(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            mostrarToast('Error', 'El formato del email no es válido', 'bg-danger');
            return;
        }

        if (destinatarios.includes(email)) {
            mostrarToast('Advertencia', 'Este email ya está en la lista', 'bg-warning');
            return;
        }

        destinatarios.push(email);
        actualizarListaDestinatarios();

        nuevoDestinatario.value = '';
    }

    // Función para eliminar un destinatario de la lista
    function eliminarDestinatario(email) {
        destinatarios = destinatarios.filter(d => d !== email);
        actualizarListaDestinatarios();
    }

    // Función para actualizar la lista visual de destinatarios
    function actualizarListaDestinatarios() {
        listaDestinatarios.innerHTML = '';

        destinatarios.forEach(email => {
            const badge = document.createElement('div');
            badge.className = 'badge bg-light text-dark p-2';
            badge.innerHTML = `
                ${email}
                <button type="button" class="btn-close btn-close-sm ms-2" data-email="${email}"></button>
            `;

            listaDestinatarios.appendChild(badge);
        });

        document.querySelectorAll('.btn-close[data-email]').forEach(btn => {
            btn.addEventListener('click', function() {
                const email = this.getAttribute('data-email');
                eliminarDestinatario(email);
            });
        });
    }

    // Función para exportar a Excel
    function exportarAExcel() {
        try {
            const headers = Object.keys(datosListado[0] || {});
            const wsData = [headers, ...datosListado.map(row => headers.map(h => row[h]))];

            const wb = XLSX.utils.book_new();
            const ws = XLSX.utils.aoa_to_sheet(wsData);

            XLSX.utils.book_append_sheet(wb, ws, "Listado");
            XLSX.writeFile(wb, "listado_exportado.xlsx");

            mostrarToast('Éxito', 'Listado exportado correctamente a Excel');
        } catch (error) {
            console.error('Error exportando a Excel:', error);
            mostrarToast('Error', 'No se pudo exportar el listado: ' + error.message, 'bg-danger');
        }
    }

    // Función para simular el envío del listado
    function enviarListado() {
        const asunto = document.getElementById('asuntoCorreo').value;
        const cuerpo = document.getElementById('cuerpoCorreo').value;

        if (!asunto) {
            mostrarToast('Error', 'Debe especificar un asunto para el correo', 'bg-danger');
            return;
        }

        if (destinatarios.length === 0) {
            mostrarToast('Error', 'Debe agregar al menos un destinatario', 'bg-danger');
            return;
        }

        if (programarEnvio.checked) {
            const fecha = document.getElementById('fechaProgramada').value;
            const hora = document.getElementById('horaProgramada').value;

            if (!fecha || !hora) {
                mostrarToast('Error', 'Debe especificar fecha y hora para el envío programado', 'bg-danger');
                return;
            }
        }

        const fechaActual = new Date().toLocaleDateString();
        const numDestinatarios = destinatarios.length;
        const estado = programarEnvio.checked ? 'Programado' : 'Enviado';
        const badgeClass = programarEnvio.checked ? 'bg-warning text-dark' : 'bg-success';

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${fechaActual}</td>
            <td>${asunto}</td>
            <td>${numDestinatarios} destinatarios</td>
            <td><span class="badge ${badgeClass}">${estado}</span></td>
            <td>
                <button class="btn btn-sm btn-outline-primary me-1"><i class="fas fa-eye"></i></button>
                <button class="btn btn-sm btn-outline-secondary"><i class="fas fa-copy"></i></button>
            </td>
        `;

        document.getElementById('historialEnvios').prepend(tr);

        if (programarEnvio.checked) {
            mostrarToast('Éxito', 'El envío ha sido programado correctamente');
        } else {
            mostrarToast('Éxito', 'El listado ha sido enviado correctamente');
        }

        document.getElementById('asuntoCorreo').value = '';
        document.getElementById('cuerpoCorreo').value = '';
        destinatarios = [];
        actualizarListaDestinatarios();

        cardVistaPrevia.style.display = 'none';
        cardEnvio.style.display = 'none';
    }

    // Event Listeners

    btnProcesarDatos.addEventListener('click', async function() {
        const archivo = excelFile.files[0];

        if (!archivo) {
            mostrarToast('Error', 'Debe seleccionar un archivo Excel', 'bg-danger');
            return;
        }

        try {
            btnProcesarDatos.disabled = true;
            btnProcesarDatos.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Procesando...';

            excelData = await cargarExcel(archivo);
            actualizarColumnasDisponibles(excelData.headers);
            mostrarVistaPrevia(excelData.headers, excelData.data);

            btnProcesarDatos.disabled = false;
            btnProcesarDatos.innerHTML = 'Procesar datos';
        } catch (error) {
            console.error('Error procesando Excel:', error);
            mostrarToast('Error', 'Error al procesar el archivo: ' + error.message, 'bg-danger');

            btnProcesarDatos.disabled = false;
            btnProcesarDatos.innerHTML = 'Procesar datos';
        }
    });

    btnExportarExcel.addEventListener('click', exportarAExcel);

    usarEmailExcel.addEventListener('change', function() {
        columnaEmail.style.display = this.checked ? 'block' : 'none';
    });

    btnAgregarDestinatario.addEventListener('click', function() {
        const email = nuevoDestinatario.value.trim();
        if (email) {
            agregarDestinatario(email);
        }
    });

    nuevoDestinatario.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            const email = this.value.trim();
            if (email) {
                agregarDestinatario(email);
            }
        }
    });

    adjuntarListado.addEventListener('change', function() {
        formatoAdjuntoOptions.style.display = this.checked ? 'block' : 'none';
    });

    programarEnvio.addEventListener('change', function() {
        opcionesProgramacion.style.display = this.checked ? 'flex' : 'none';
    });

    btnVolverProcesar.addEventListener('click', function() {
        cardEnvio.style.display = 'none';
    });

    btnEnviarListado.addEventListener('click', enviarListado);
};