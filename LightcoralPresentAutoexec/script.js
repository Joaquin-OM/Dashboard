document.addEventListener("DOMContentLoaded", function() {
    const links = document.querySelectorAll(".nav-link");
    const content = document.getElementById("app-content");

    // Cargar página por defecto
    loadPage('inicio');

    // Manejo de clics en los enlaces del menú
    links.forEach(link => {
        link.addEventListener("click", function(e) {
            e.preventDefault();
            const page = this.getAttribute("data-page");

            // Añadir clase para animación de salida
            content.classList.add('fade-out');

            // Esperar a que termine la animación antes de cambiar el contenido
            setTimeout(() => {
                loadPage(page);
                setActiveLink(this);
                // Quitar la clase de animación
                content.classList.remove('fade-out');
                content.classList.add('fade-in');

                setTimeout(() => {
                    content.classList.remove('fade-in');
                }, 500);
            }, 300);
        });
    });

    function loadPage(page) {
        // Plantilla de carga con spinner
        if (page === 'inicio') {
            content.innerHTML = `
                <div class="welcome-section">
                    <h2 class="text-center mb-4">Bienvenido al Dashboard</h2>
                    <p class="lead text-center">Selecciona una aplicación desde el menú para comenzar.</p>
                    <div class="feature-icons">
                        <div class="feature-item">
                            <div class="icon">🏷</div>
                            <h5>Renombrado</h5>
                        </div>
                        <div class="feature-item">
                            <div class="icon">🔍</div>
                            <h5>Comparación</h5>
                        </div>
                        <div class="feature-item">
                            <div class="icon">📧</div>
                            <h5>Envío</h5>
                        </div>
                        <div class="feature-item">
                            <div class="icon">📄</div>
                            <h5>Registro</h5>
                        </div>
                    </div>
                </div>`;
        } else {
            content.innerHTML = `
                <div class="spinner-container">
                    <div class="spinner-border text-primary" role="status">
                        <span class="visually-hidden">Cargando...</span>
                    </div>
                    <p class="mt-2">Cargando ${page}...</p>
                </div>`;

            setTimeout(() => {
                // Cargar contenido específico según la página seleccionada
                switch(page) {
                    case 'renombrado':
                        content.innerHTML = `
                            <div class="page-header">
                                <h3 class="animated-title">RENOMBRADO DE ARCHIVOS</h3>
                                <div class="header-underline"></div>
                            </div>
                            <div class="card shadow-sm p-4 mt-4">
                                <h5 class="card-title mb-3">Selección de archivos</h5>
                                <div class="mb-3">
                                    <div id="fileDrop" class="p-4 border rounded text-center bg-light">
                                        <i class="fas fa-cloud-upload-alt fs-2 mb-2 text-primary"></i>
                                        <p id="dropText">Arrastra archivos aquí o <span class="btn btn-sm btn-outline-primary" id="selectFilesBtn">selecciona archivos</span></p>
                                        <input type="file" id="fileInput" multiple style="display: none;">
                                        <button class="btn btn-outline-danger btn-sm" id="clearFilesBtn" style="display: none;">
                                            <i class="fas fa-times me-1"></i>Limpiar selección
                                        </button>
                                    </div>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">Formato de nuevo nombre</label>
                                    <div class="alert alert-info">
                                        Estructura: YYYY-MM-DD_DOCUMENTO_CLIENTE
                                    </div>
                                </div>
                                        <div class="mb-3">
                                            <label for="replacePattern" class="form-label">Patrón de reemplazo</label>
                                            <input type="text" class="form-control" id="replacePattern" placeholder="Ej: Foto_ o Cliente_$index">
                                            <div class="form-text">Usa $index para incluir numeración secuencial, $date para fecha</div>
                                        </div>
                                        <div class="mb-3">
                                            <label for="startNumber" class="form-label">Número inicial (para secuencias)</label>
                                            <input type="number" class="form-control" id="startNumber" value="1" min="0">
                                        </div>
                                        <div class="mb-3">
                                            <label for="padding" class="form-label">Relleno de ceros (para secuencias)</label>
                                            <input type="number" class="form-control" id="padding" value="2" min="1" max="10">
                                            <div class="form-text">Número de dígitos para el índice (ej: 01, 02...)</div>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="mb-3">
                                            <label for="fileExtension" class="form-label">Extensión de archivo</label>
                                            <select class="form-select" id="fileExtension">
                                                <option selected value="">Mantener original</option>
                                                <option value=".jpg">JPG</option>
                                                <option value=".png">PNG</option>
                                                <option value=".pdf">PDF</option>
                                                <option value=".doc">DOC</option>
                                                <option value=".xlsx">XLSX</option>
                                                <option value=".txt">TXT</option>
                                            </select>
                                        </div>
                                        <div class="mb-3">
                                            <label for="dateFormat" class="form-label">Formato de fecha (para $date)</label>
                                            <select class="form-select" id="dateFormat">
                                                <option value="yyyymmdd" selected>AAAAMMDD</option>
                                                <option value="ddmmyyyy">DDMMAAAA</option>
                                                <option value="yyyymmdd_hhmmss">AAAAMMDD_HHMMSS</option>
                                                <option value="yyyy-mm-dd">AAAA-MM-DD</option>
                                            </select>
                                        </div>
                                        <div class="mb-3">
                                            <label for="regexPattern" class="form-label">Extraer parte del nombre (opcional)</label>
                                            <div class="input-group">
                                                <span class="input-group-text">/</span>
                                                <input type="text" class="form-control" id="regexPattern" placeholder="Expresión regular">
                                                <span class="input-group-text">/</span>
                                            </div>
                                            <div class="form-text">Extrae partes específicas con grupos de captura (...)</div>
                                        </div>
                                        <div class="form-check">
                                            <input class="form-check-input" type="checkbox" id="preserveOriginal">
                                            <label class="form-check-label" for="preserveOriginal">
                                                Conservar archivos originales
                                            </label>
                                        </div>
                                        <div class="form-check">
                                            <input class="form-check-input" type="checkbox" id="processFolders">
                                            <label class="form-check-label" for="processFolders">
                                                Procesar también subcarpetas
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                

                                <div id="previewContainer" class="mb-4" style="display: none;">
                                    <div class="d-flex justify-content-between align-items-center mb-2">
                                        <h6 class="m-0">Vista previa de renombrado</h6>
                                        <span class="badge bg-primary" id="filesCount">0 archivos</span>
                                    </div>
                                    <div class="table-responsive" style="max-height: 300px; overflow-y: auto;">
                                        <table class="table table-sm table-striped table-hover">
                                            <thead class="sticky-top bg-light">
                                                <tr>
                                                    <th style="width: 50%">Nombre original</th>
                                                    <th style="width: 50%">Nuevo nombre</th>
                                                </tr>
                                            </thead>
                                            <tbody id="previewTableBody">
                                                <!-- Aquí se generará la vista previa -->
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                <div class="d-flex justify-content-between">
                                    <button class="btn btn-light border" id="previewBtn">
                                        <i class="fas fa-eye me-2"></i>Vista previa
                                    </button>
                                    <button class="btn btn-primary" id="renameBtn" disabled>
                                        <i class="fas fa-tag me-2"></i>Renombrar <span id="renameCount"></span>
                                    </button>
                                </div>
                            </div>

                            <div class="card shadow-sm p-4 mt-4" id="progressCard" style="display: none;">
                                <h5 class="card-title mb-3">Progreso de renombrado</h5>
                                <div class="progress mb-3">
                                    <div class="progress-bar progress-bar-striped progress-bar-animated" id="progressBar" role="progressbar" style="width: 0%"></div>
                                </div>
                                <div class="d-flex justify-content-between">
                                    <span id="progressText">Procesando...</span>
                                    <span id="progressStats">0/0</span>
                                </div>
                            </div>

                            <div class="card shadow-sm p-4 mt-4">
                                <div class="d-flex justify-content-between mb-3">
                                    <h5 class="card-title mb-0">Historial de operaciones</h5>
                                    <button class="btn btn-sm btn-outline-secondary" id="clearHistoryBtn">
                                        <i class="fas fa-broom me-1"></i>Limpiar historial
                                    </button>
                                </div>
                                <div class="table-responsive">
                                    <table class="table table-striped">
                                        <thead>
                                            <tr>
                                                <th>Fecha</th>
                                                <th>Patrón usado</th>
                                                <th>Archivos procesados</th>
                                                <th>Estado</th>
                                                <th>Acciones</th>
                                            </tr>
                                        </thead>
                                        <tbody id="historyTableBody">
                                            <!-- El historial se generará dinámicamente -->
                                        </tbody>
                                    </table>
                                </div>
                                <div id="emptyHistoryMsg" class="alert alert-info" style="display: none;">
                                    No hay operaciones registradas en el historial.
                                </div>
                            </div>`;

                        // Configurar funcionalidad de renombrado después de cargar el contenido
                        setTimeout(() => {
                            // Variables para almacenar archivos y configuración
                            let selectedFiles = [];
                            let previewRenames = [];
                            let operationHistory = JSON.parse(localStorage.getItem('renameHistory') || '[]');

                            // Referencias a elementos del DOM
                            const fileDrop = document.getElementById('fileDrop');
                            const fileInput = document.getElementById('fileInput');
                            const folderInput = document.getElementById('folderInput');
                            const selectFilesBtn = document.getElementById('selectFilesBtn');
                            const selectFolderBtn = document.getElementById('selectFolderBtn');
                            const clearFilesBtn = document.getElementById('clearFilesBtn');
                            const dropText = document.getElementById('dropText');
                            const filesCount = document.getElementById('filesCount');
                            const previewContainer = document.getElementById('previewContainer');
                            const previewTableBody = document.getElementById('previewTableBody');
                            const previewBtn = document.getElementById('previewBtn');
                            const renameBtn = document.getElementById('renameBtn');
                            const renameCount = document.getElementById('renameCount');
                            const progressCard = document.getElementById('progressCard');
                            const progressBar = document.getElementById('progressBar');
                            const progressText = document.getElementById('progressText');
                            const progressStats = document.getElementById('progressStats');
                            const historyTableBody = document.getElementById('historyTableBody');
                            const emptyHistoryMsg = document.getElementById('emptyHistoryMsg');
                            const clearHistoryBtn = document.getElementById('clearHistoryBtn');

                            // Elementos de formulario
                            const filePattern = document.getElementById('filePattern');
                            const replacePattern = document.getElementById('replacePattern');
                            const startNumber = document.getElementById('startNumber');
                            const padding = document.getElementById('padding');
                            const fileExtension = document.getElementById('fileExtension');
                            const dateFormat = document.getElementById('dateFormat');
                            const regexPattern = document.getElementById('regexPattern');
                            const preserveOriginal = document.getElementById('preserveOriginal');
                            const processFolders = document.getElementById('processFolders');

                            // Función para mostrar toast (mensaje)
                            function showToast(title, message, type = 'bg-success') {
                                // Crear contenedor de toast si no existe
                                let toastContainer = document.querySelector('.toast-container');
                                if (!toastContainer) {
                                    toastContainer = document.createElement('div');
                                    toastContainer.className = 'toast-container position-fixed bottom-0 end-0 p-3';
                                    toastContainer.style.zIndex = '1050';
                                    document.body.appendChild(toastContainer);
                                }

                                // Crear el toast
                                const toastId = 'toast-' + Date.now();
                                const toastHtml = `
                                    <div id="${toastId}" class="toast ${type}" role="alert" aria-live="assertive" aria-atomic="true">
                                        <div class="toast-header">
                                            <strong class="me-auto">${title}</strong>
                                            <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                                        </div>
                                        <div class="toast-body text-white">
                                            ${message}
                                        </div>
                                    </div>
                                `;

                                // Agregar el toast al contenedor
                                toastContainer.insertAdjacentHTML('beforeend', toastHtml);

                                // Mostrar el toast
                                const toastElement = document.getElementById(toastId);
                                const toast = new bootstrap.Toast(toastElement, { delay: 5000 });
                                toast.show();

                                // Eliminar el toast después de ocultarse
                                toastElement.addEventListener('hidden.bs.toast', () => {
                                    toastElement.remove();
                                });
                            }

                            // Función para actualizar la interfaz de archivos seleccionados
                            function updateSelectedFilesUI() {
                                if (selectedFiles.length > 0) {
                                    dropText.innerHTML = '<span class="text-success"><i class="fas fa-check me-2"></i>Archivos seleccionados</span>';
                                    filesCount.textContent = `${selectedFiles.length} archivos`;
                                    clearFilesBtn.style.display = 'block';
                                } else {
                                    dropText.innerHTML = 'Arrastra archivos aquí o <span class="btn btn-sm btn-outline-primary" id="selectFilesBtn">selecciona archivos</span>';
                                    previewContainer.style.display = 'none';
                                    clearFilesBtn.style.display = 'none';
                                    renameBtn.disabled = true;
                                    renameCount.textContent = '';

                                    // Reconfigurar el botón de selección de archivos
                                    document.getElementById('selectFilesBtn').addEventListener('click', () => {
                                        fileInput.click();
                                    });
                                }
                            }

                            // Función para limpiar la selección de archivos
                            function clearSelectedFiles() {
                                selectedFiles = [];
                                previewRenames = [];
                                updateSelectedFilesUI();
                                fileInput.value = '';
                                folderInput.value = '';
                            }

                            // Función para formatear la fecha según el formato seleccionado
                            function formatDate(format) {
                                const now = new Date();
                                const year = now.getFullYear();
                                const month = String(now.getMonth() + 1).padStart(2, '0');
                                const day = String(now.getDate()).padStart(2, '0');
                                const hours = String(now.getHours()).padStart(2, '0');
                                const minutes = String(now.getMinutes()).padStart(2, '0');
                                const seconds = String(now.getSeconds()).padStart(2, '0');

                                switch (format) {
                                    case 'yyyymmdd':
                                        return `${year}${month}${day}`;
                                    case 'ddmmyyyy':
                                        return `${day}${month}${year}`;
                                    case 'yyyymmdd_hhmmss':
                                        return `${year}${month}${day}_${hours}${minutes}${seconds}`;
                                    case 'yyyy-mm-dd':
                                        return `${year}-${month}-${day}`;
                                    default:
                                        return `${year}${month}${day}`;
                                }
                            }

                            // Función para generar nuevo nombre basado en patrones
                            function generateNewName(originalName, index) {
                                // Obtener valores de los campos
                                const pattern = filePattern.value;
                                const replacement = replacePattern.value;
                                const startIdx = parseInt(startNumber.value, 10) || 0;
                                const padLength = parseInt(padding.value, 10) || 2;
                                const newExt = fileExtension.value;
                                const dateFormatValue = dateFormat.value;
                                const regexPatternValue = regexPattern.value;

                                // Separar nombre y extensión
                                let fileName, fileExt;
                                const lastDotIndex = originalName.lastIndexOf('.');

                                if (lastDotIndex === -1) {
                                    fileName = originalName;
                                    fileExt = '';
                                } else {
                                    fileName = originalName.substring(0, lastDotIndex);
                                    fileExt = originalName.substring(lastDotIndex);
                                }

                                // Procesar el nombre base según el patrón
                                let newName = fileName;

                                // Si hay un patrón de expresión regular, aplicarlo
                                if (regexPatternValue) {
                                    try {
                                        const regex = new RegExp(regexPatternValue);
                                        const match = fileName.match(regex);

                                        if (match && match.length > 1) {
                                            // Usar los grupos de captura para el nuevo nombre
                                            newName = match.slice(1).join('_');
                                        }
                                    } catch (error) {
                                        console.error('Error en la expresión regular:', error);
                                    }
                                }
                                // Si hay un patrón de búsqueda, aplicarlo
                                else if (pattern && pattern !== '*') {
                                    // Convertir el patrón a expresión regular
                                    const regexPattern = pattern
                                        .replace(/\./g, '\\.')
                                        .replace(/\*/g, '(.*)');

                                    try {
                                        const regex = new RegExp(regexPattern);
                                        const match = fileName.match(regex);

                                        if (match && match.length > 1) {
                                            // Reemplazar $1, $2, etc. en el patrón de reemplazo
                                            newName = replacement;
                                            for (let i = 1; i < match.length; i++) {
                                                newName = newName.replace('$' + i, match[i]);
                                            }
                                        } else if (replacement) {
                                            newName = replacement;
                                        }
                                    } catch (error) {
                                        console.error('Error en el patrón de búsqueda:', error);
                                        newName = replacement || fileName;
                                    }
                                } 
                                // Si solo hay un patrón de reemplazo, usarlo directamente
                                else if (replacement) {
                                    newName = replacement;
                                }

                                // Reemplazar variables especiales en el nuevo nombre
                                const currentIndex = startIdx + index;
                                newName = newName.replace('$index', String(currentIndex).padStart(padLength, '0'));
                                newName = newName.replace('$date', formatDate(dateFormatValue));

                                // Determinar la extensión final
                                const finalExt = newExt || fileExt;

                                // Asegurarse de que la extensión comience con un punto
                                const formattedExt = finalExt.startsWith('.') ? finalExt : (finalExt ? '.' + finalExt : '');

                                return newName + formattedExt;
                            }

                            // Función para generar vista previa de renombrado
                            function generatePreview() {
                                if (selectedFiles.length === 0) {
                                    showToast('Advertencia', 'No hay archivos seleccionados para renombrar', 'bg-warning');
                                    return;
                                }

                                previewRenames = [];
                                previewTableBody.innerHTML = '';

                                // Generar vista previa para cada archivo
                                selectedFiles.forEach((file, index) => {
                                    const newName = generateNewName(file.name, index);

                                    previewRenames.push({
                                        originalFile: file,
                                        newName: newName
                                    });

                                    // Agregar fila a la tabla de vista previa
                                    const row = document.createElement('tr');
                                    row.innerHTML = `
                                        <td class="text-truncate" title="${file.name}">${file.name}</td>
                                        <td class="text-truncate" title="${newName}">${newName}</td>
                                    `;
                                    previewTableBody.appendChild(row);
                                });

                                // Mostrar contenedor de vista previa
                                previewContainer.style.display = 'block';
                                renameBtn.disabled = false;
                                renameCount.textContent = `(${previewRenames.length})`;
                            }

                            // Función para ejecutar el renombrado
                            function executeRename() {
                                if (previewRenames.length === 0) {
                                    showToast('Advertencia', 'Genera una vista previa antes de renombrar', 'bg-warning');
                                    return;
                                }

                                // Mostrar tarjeta de progreso
                                progressCard.style.display = 'block';
                                progressBar.style.width = '0%';
                                progressText.textContent = 'Preparando operación...';
                                progressStats.textContent = `0/${previewRenames.length}`;

                                // Deshabilitar botones durante la operación
                                previewBtn.disabled = true;
                                renameBtn.disabled = true;

                                // Valores para el registro de historial
                                const patternUsed = filePattern.value ? 
                                    `${filePattern.value} → ${replacePattern.value}` : 
                                    replacePattern.value;

                                const shouldPreserve = preserveOriginal.checked;

                                // Iniciar operación de renombrado con un pequeño retraso para permitir que la UI se actualice
                                setTimeout(() => {
                                    let processed = 0;
                                    let successful = 0;

                                    // En un entorno real, aquí se realizaría el renombrado de archivos físicos
                                    // En este ejemplo de interfaz web, simularemos el proceso con timeouts

                                    const processNextFile = (index) => {
                                        if (index >= previewRenames.length) {
                                            // Operación completada
                                            finishRenameOperation(successful, processed);
                                            return;
                                        }

                                        const item = previewRenames[index];
                                        progressText.textContent = `Renombrando: ${item.originalFile.name}`;

                                        // Simular el tiempo que toma renombrar un archivo
                                        setTimeout(() => {
                                            processed++;

                                            // Simular éxito o fallo ocasional
                                            if (Math.random() > 0.05) { // 95% de éxito
                                                successful++;
                                            }

                                            // Actualizar progreso
                                            const progress = (processed / previewRenames.length) * 100;
                                            progressBar.style.width = `${progress}%`;
                                            progressStats.textContent = `${processed}/${previewRenames.length}`;

                                            // Procesar siguiente archivo
                                            processNextFile(index + 1);
                                        }, 50 + Math.random() * 100); // Tiempo aleatorio entre 50ms y 150ms
                                    };

                                    // Iniciar procesamiento
                                    processNextFile(0);
                                }, 500);

                                // Función para finalizar la operación de renombrado
                                function finishRenameOperation(successful, total) {
                                    // Actualizar UI
                                    progressText.textContent = 'Operación completada';
                                    progressBar.style.width = '100%';

                                    // Habilitar botones
                                    previewBtn.disabled = false;
                                    renameBtn.disabled = false;

                                    // Mostrar mensaje de resultado
                                    if (successful === total) {
                                        showToast('Éxito', `Se renombraron ${successful} archivos correctamente`, 'bg-success');
                                    } else {
                                        showToast('Completado con advertencias', 
                                            `Se renombraron ${successful} de ${total} archivos`, 
                                            'bg-warning');
                                    }

                                    // Agregar a historial
                                    const historyEntry = {
                                        id: Date.now(),
                                        date: new Date().toLocaleDateString(),
                                        pattern: patternUsed,
                                        processed: total,
                                        successful: successful,
                                        status: successful === total ? 'Completado' : 'Parcial'
                                    };

                                    operationHistory.unshift(historyEntry);
                                    if (operationHistory.length > 20) {
                                        operationHistory.pop(); // Mantener máximo 20 entradas
                                    }

                                    // Guardar historial en localStorage
                                    localStorage.setItem('renameHistory', JSON.stringify(operationHistory));

                                    // Actualizar tabla de historial
                                    updateHistoryTable();

                                    // Ocultar tarjeta de progreso después de un tiempo
                                    setTimeout(() => {
                                        progressCard.style.display = 'none';
                                    }, 3000);
                                }
                            }

                            // Función para actualizar la tabla de historial
                            function updateHistoryTable() {
                                historyTableBody.innerHTML = '';

                                if (operationHistory.length === 0) {
                                    emptyHistoryMsg.style.display = 'block';
                                    return;
                                }

                                emptyHistoryMsg.style.display = 'none';

                                operationHistory.forEach(entry => {
                                    const row = document.createElement('tr');
                                    const statusClass = entry.status === 'Completado' ? 'bg-success' : 'bg-warning';

                                    row.innerHTML = `
                                        <td>${entry.date}</td>
                                        <td>${entry.pattern}</td>
                                        <td>${entry.successful}/${entry.processed}</td>
                                        <td><span class="badge ${statusClass}">${entry.status}</span></td>
                                        <td>
                                            <button class="btn btn-sm btn-outline-danger delete-history" data-id="${entry.id}">
                                                <i class="fas fa-trash"></i>
                                            </button>
                                        </td>
                                    `;

                                    historyTableBody.appendChild(row);
                                });

                                // Configurar botones de eliminación
                                document.querySelectorAll('.delete-history').forEach(btn => {
                                    btn.addEventListener('click', function() {
                                        const id = parseInt(this.getAttribute('data-id'), 10);
                                        operationHistory = operationHistory.filter(entry => entry.id !== id);
                                        localStorage.setItem('renameHistory', JSON.stringify(operationHistory));
                                        updateHistoryTable();
                                    });
                                });
                            }

                            // Configurar eventos para drag and drop de archivos
                            fileDrop.addEventListener('dragover', (e) => {
                                e.preventDefault();
                                fileDrop.classList.add('border-primary');
                            });

                            fileDrop.addEventListener('dragleave', () => {
                                fileDrop.classList.remove('border-primary');
                            });

                            fileDrop.addEventListener('drop', (e) => {
                                e.preventDefault();
                                fileDrop.classList.remove('border-primary');

                                if (e.dataTransfer.items) {
                                    selectedFiles = Array.from(e.dataTransfer.files);
                                    updateSelectedFilesUI();
                                }
                            });

                            // Eventos de botones de selección de archivos
                            selectFilesBtn.addEventListener('click', () => {
                                fileInput.click();
                            });

                            fileInput.addEventListener('change', () => {
                                if (fileInput.files.length > 0) {
                                    selectedFiles = Array.from(fileInput.files);
                                    updateSelectedFilesUI();
                                }
                            });

                            selectFolderBtn.addEventListener('click', () => {
                                folderInput.click();
                            });

                            folderInput.addEventListener('change', () => {
                                if (folderInput.files.length > 0) {
                                    selectedFiles = Array.from(folderInput.files);
                                    updateSelectedFilesUI();
                                }
                            });

                            // Botón para limpiar selección
                            clearFilesBtn.addEventListener('click', clearSelectedFiles);

                            // Botón de vista previa
                            previewBtn.addEventListener('click', generatePreview);

                            // Botón de renombrar
                            renameBtn.addEventListener('click', executeRename);

                            // Botón de limpiar historial
                            clearHistoryBtn.addEventListener('click', () => {
                                if (confirm('¿Estás seguro de que deseas limpiar todo el historial de operaciones?')) {
                                    operationHistory = [];
                                    localStorage.setItem('renameHistory', JSON.stringify(operationHistory));
                                    updateHistoryTable();
                                    showToast('Información', 'Historial limpiado correctamente', 'bg-info');
                                }
                            });

                            // Inicializar tabla de historial
                            updateHistoryTable();

                        }, 100);
                        break;
                    case 'comparacion':
                        content.innerHTML = `
                            <div class="page-header">
                                <h3 class="animated-title">COMPARACIÓN DE NOMBRES</h3>
                                <div class="header-underline"></div>
                            </div>
                            <div class="card shadow-sm p-4 mt-4">
                                <h5 class="card-title mb-3">Comparación de archivos con Excel</h5>
                                <div class="row mb-4">
                                    <div class="col-md-6">
                                        <div class="mb-3">
                                            <label for="archivoExcel" class="form-label">Archivo Excel con nombres</label>
                                            <input type="file" class="form-control" id="archivoExcel" accept=".xlsx,.xls">
                                        </div>
                                        <div class="mb-3">
                                            <label for="columnasExcel" class="form-label">Columnas de nombres (separadas por comas)</label>
                                            <input type="text" class="form-control" id="columnasExcel" placeholder="Ej: Cliente, Nombre, Empresa">
                                        </div>
                                        <div class="mb-3">
                                            <label for="umbralSimilitud" class="form-label">Umbral de similitud (0.1-1.0)</label>
                                            <input type="range" class="form-range" id="umbralSimilitud" min="0.1" max="1" step="0.1" value="0.3">
                                            <div id="valorUmbral" class="text-center">0.3</div>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="mb-3">
                                            <label for="carpetaArchivos" class="form-label">Carpeta con archivos</label>
                                            <div class="input-group">
                                                <input type="file" class="form-control" id="carpetaArchivos" webkitdirectory directory multiple>
                                            </div>
                                            <div class="form-text">Selecciona todos los archivos de la carpeta</div>
                                        </div>
                                        <div class="mb-3 mt-4">
                                            <div class="form-check">
                                                <input class="form-check-input" type="checkbox" id="mostrarSoloCoincidencias" checked>
                                                <label class="form-check-label" for="mostrarSoloCoincidencias">
                                                    Mostrar solo coincidencias
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <button class="btn btn-primary" id="btnCompararNombres">Comparar nombres</button>
                            </div>
                            <div class="card shadow-sm p-4 mt-4" id="resultadosCard" style="display: none;">
                                <h5 class="card-title mb-3">Resultados de la comparación</h5>

                                <div class="alert alert-info mb-3" id="resumenComparacion">
                                    <strong>Resumen:</strong> <span id="textoResumen"></span>
                                </div>

                                <ul class="nav nav-tabs" id="resultadosTabs" role="tablist">
                                    <li class="nav-item" role="presentation">
                                        <button class="nav-link active" id="coincidencias-tab" data-bs-toggle="tab" data-bs-target="#coincidencias" type="button" role="tab">
                                            Coincidencias <span class="badge bg-success" id="numCoincidencias">0</span>
                                        </button>
                                    </li>
                                    <li class="nav-item" role="presentation">
                                        <button class="nav-link" id="soloExcel-tab" data-bs-toggle="tab" data-bs-target="#soloExcel" type="button" role="tab">
                                            Solo en Excel <span class="badge bg-warning text-dark" id="numSoloExcel">0</span>
                                        </button>
                                    </li>
                                    <li class="nav-item" role="presentation">
                                        <button class="nav-link" id="soloArchivos-tab" data-bs-toggle="tab" data-bs-target="#soloArchivos" type="button" role="tab">
                                            Solo en Archivos <span class="badge bg-danger" id="numSoloArchivos">0</span>
                                        </button>
                                    </li>
                                </ul>

                                <div class="tab-content pt-3" id="resultadosTabsContent">
                                    <div class="tab-pane fade show active" id="coincidencias" role="tabpanel">
                                        <table class="table table-striped table-hover">
                                            <thead>
                                                <tr>
                                                    <th>Nombre del archivo</th>
                                                    <th>Coincidencia en Excel</th>
                                                    <th>Nivel de similitud</th>
                                                </tr>
                                            </thead>
                                            <tbody id="coincidenciasTabla">
                                                <!-- Las coincidencias se cargarán aquí -->
                                            </tbody>
                                        </table>
                                    </div>

                                    <div class="tab-pane fade" id="soloExcel" role="tabpanel">
                                        <div class="table-responsive">
                                            <table class="table table-striped">
                                                <thead>
                                                    <tr>
                                                        <th>Nombres en Excel sin archivos correspondientes</th>
                                                    </tr>
                                                </thead>
                                                <tbody id="soloExcelTabla">
                                                    <!-- Los nombres solo en Excel se cargarán aquí -->
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>

                                    <div class="tab-pane fade" id="soloArchivos" role="tabpanel">
                                        <div class="table-responsive">
                                            <table class="table table-striped">
                                                <thead>
                                                    <tr>
                                                        <th>Archivos sin coincidencia en Excel</th>
                                                    </tr>
                                                </thead>
                                                <tbody id="soloArchivosTabla">
                                                    <!-- Los archivos sin coincidencia se cargarán aquí -->
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>

                                <div class="d-flex justify-content-end mt-3">
                                    <button class="btn btn-outline-primary me-2" id="btnExportarTodo">Exportar resultados</button>
                                </div>
                            </div>`;

                        // Configurar funcionalidad de comparación después de cargar el contenido
                        setTimeout(() => {
                            const umbralSimilitud = document.getElementById('umbralSimilitud');
                            const valorUmbral = document.getElementById('valorUmbral');
                            const btnCompararNombres = document.getElementById('btnCompararNombres');
                            const resultadosCard = document.getElementById('resultadosCard');
                            const btnExportarTodo = document.getElementById('btnExportarTodo');

                            // Actualizar el valor del umbral cuando se mueve el control deslizante
                            umbralSimilitud.addEventListener('input', function() {
                                valorUmbral.textContent = this.value;
                            });

                            // Función para obtener los nombres de un archivo Excel
                            async function obtenerNombresExcel(file, columnas) {
                                return new Promise((resolve, reject) => {
                                    const reader = new FileReader();
                                    reader.onload = async function(e) {
                                        try {
                                            const columnasList = columnas.split(',').map(col => col.trim());
                                            const data = new Uint8Array(e.target.result);
                                            const nombres = await procesarExcel(data, columnasList);
                                            resolve(nombres);
                                        } catch (error) {
                                            reject(error);
                                        }
                                    };
                                    reader.onerror = reject;
                                    reader.readAsArrayBuffer(file);
                                });
                            }

                            // Función para procesar el Excel (simulada - en la web no podemos usar pandas)
                            async function procesarExcel(data, columnas) {
                                // En un entorno real, aquí usaríamos una librería como SheetJS (xlsx)
                                // Para el ejemplo, vamos a simular el procesamiento
                                const result = [];

                                try {
                                    // Cargar la librería SheetJS desde CDN
                                    if (typeof XLSX === 'undefined') {
                                        await loadScript('https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js');
                                    }

                                    // Procesar el archivo Excel
                                    const workbook = XLSX.read(data, { type: 'array' });

                                    // Obtener la primera hoja
                                    const firstSheetName = workbook.SheetNames[0];
                                    const worksheet = workbook.Sheets[firstSheetName];

                                    // Convertir a JSON
                                    const jsonData = XLSX.utils.sheet_to_json(worksheet);

                                    // Extraer los nombres de las columnas especificadas
                                    jsonData.forEach(row => {
                                        columnas.forEach(columna => {
                                            if (row[columna] && typeof row[columna] === 'string' && row[columna].trim() !== '') {
                                                result.push(row[columna].trim());
                                            }
                                        });
                                    });

                                    return result.filter(nombre => nombre !== undefined);
                                } catch (error) {
                                    console.error('Error procesando Excel:', error);
                                    throw new Error('Error al procesar el archivo Excel: ' + error.message);
                                }
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

                            // Función para revisar coincidencias entre archivos y nombres
                            function revisarCoincidencias(archivos, nombresClientes, umbralSimilitud) {
                                const coincidencias = [];
                                const soloArchivos = [];

                                for (const archivo of archivos) {
                                    // Extraer el nombre del archivo sin la extensión
                                    const nombreArchivo = archivo.name.slice(0, archivo.name.lastIndexOf('.'));

                                    // Buscar coincidencias con los nombres de clientes
                                    let mejorCoincidencia = null;
                                    let mejorPuntuacion = 0;

                                    for (const nombreCliente of nombresClientes) {
                                        const puntuacion = calcularSimilitud(nombreArchivo.toLowerCase(), nombreCliente.toLowerCase());

                                        if (puntuacion > umbralSimilitud && puntuacion > mejorPuntuacion) {
                                            mejorCoincidencia = nombreCliente;
                                            mejorPuntuacion = puntuacion;
                                        }
                                    }

                                    if (mejorCoincidencia) {
                                        coincidencias.push({
                                            archivo: archivo.name,
                                            coincidencia: mejorCoincidencia,
                                            similitud: mejorPuntuacion.toFixed(2)
                                        });
                                    } else {
                                        soloArchivos.push(archivo.name);
                                    }
                                }

                                // Identificar nombres que solo están en el Excel
                                const archivosConCoincidencia = coincidencias.map(c => c.coincidencia);
                                const soloExcel = nombresClientes.filter(nombre => !archivosConCoincidencia.includes(nombre));

                                return {
                                    coincidencias,
                                    soloArchivos,
                                    soloExcel
                                };
                            }

                            // Función para calcular la similitud entre dos strings
                            function calcularSimilitud(str1, str2) {
                                if (str1 === str2) return 1.0;

                                const len1 = str1.length;
                                const len2 = str2.length;

                                // Distancia Levenshtein
                                const distanciaLevenshtein = (s1, s2) => {
                                    const matriz = Array(s1.length + 1).fill().map(() => 
                                        Array(s2.length + 1).fill(0)
                                    );

                                    for (let i = 0; i <= s1.length; i++) matriz[i][0] = i;
                                    for (let j = 0; j <= s2.length; j++) matriz[0][j] = j;

                                    for (let i = 1; i <= s1.length; i++) {
                                        for (let j = 1; j <= s2.length; j++) {
                                            const costo = s1[i - 1] === s2[j - 1] ? 0 : 1;
                                            matriz[i][j] = Math.min(
                                                matriz[i - 1][j] + 1,
                                                matriz[i][j - 1] + 1,
                                                matriz[i - 1][j - 1] + costo
                                            );
                                        }
                                    }

                                    return matriz[s1.length][s2.length];
                                };

                                // Calcular la distancia
                                const distancia = distanciaLevenshtein(str1, str2);

                                // Calcular similitud como 1 - (distancia normalizada)
                                return 1 - (distancia / Math.max(len1, len2));
                            }

                            // Función para mostrar los resultados en las tablas
                            function mostrarResultados(resultados) {
                                // Mostrar resumen
                                document.getElementById('textoResumen').textContent = `Se encontraron ${resultados.coincidencias.length} coincidencias, ${resultados.soloExcel.length} nombres solo en Excel y ${resultados.soloArchivos.length} archivos sin coincidencia.`;

                                // Actualizar los contadores en las pestañas
                                document.getElementById('numCoincidencias').textContent = resultados.coincidencias.length;
                                document.getElementById('numSoloExcel').textContent = resultados.soloExcel.length;
                                document.getElementById('numSoloArchivos').textContent = resultados.soloArchivos.length;

                                // Mostrar coincidencias
                                const coincidenciasTabla = document.getElementById('coincidenciasTabla');
                                coincidenciasTabla.innerHTML = '';

                                resultados.coincidencias.forEach(c => {
                                    const tr = document.createElement('tr');
                                    tr.innerHTML = `
                                        <td>${c.archivo}</td>
                                        <td>${c.coincidencia}</td>
                                        <td>${c.similitud}</td>
                                    `;
                                    coincidenciasTabla.appendChild(tr);
                                });

                                // Mostrar solo Excel
                                const soloExcelTabla = document.getElementById('soloExcelTabla');
                                soloExcelTabla.innerHTML = '';

                                resultados.soloExcel.forEach(nombre => {
                                    const tr = document.createElement('tr');
                                    tr.innerHTML = `<td>${nombre}</td>`;
                                    soloExcelTabla.appendChild(tr);
                                });

                                // Mostrar solo Archivos
                                const soloArchivosTabla = document.getElementById('soloArchivosTabla');
                                soloArchivosTabla.innerHTML = '';

                                resultados.soloArchivos.forEach(archivo => {
                                    const tr = document.createElement('tr');
                                    tr.innerHTML = `<td>${archivo}</td>`;
                                    soloArchivosTabla.appendChild(tr);
                                });

                                // Mostrar card de resultados
                                resultadosCard.style.display = 'block';
                            }

                            // Exportar los resultados a CSV
                            function exportarResultadosCSV(resultados) {
                                let csv = "Tipo,Archivo/Nombre,Coincidencia,Similitud\n";

                                // Añadir coincidencias
                                resultados.coincidencias.forEach(c => {
                                    csv += `Coincidencia,"${c.archivo}","${c.coincidencia}",${c.similitud}\n`;
                                });

                                // Añadir solo Excel
                                resultados.soloExcel.forEach(nombre => {
                                    csv += `Solo en Excel,"${nombre}",,\n`;
                                });

                                // Añadir solo Archivos
                                resultados.soloArchivos.forEach(archivo => {
                                    csv += `Solo en Archivos,"${archivo}",,\n`;
                                });

                                // Crear un blob y descargarlo
                                const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
                                const url = URL.createObjectURL(blob);
                                const link = document.createElement('a');
                                link.setAttribute('href', url);
                                link.setAttribute('download', 'resultados_comparacion.csv');
                                link.style.visibility = 'hidden';
                                document.body.appendChild(link);
                                link.click();
                                document.body.removeChild(link);
                            }

                            // Manejar el evento de clic en el botón de comparar
                            btnCompararNombres.addEventListener('click', async function() {
                                try {
                                    const archivoExcel = document.getElementById('archivoExcel').files[0];
                                    const columnasExcel = document.getElementById('columnasExcel').value;
                                    const archivos = document.getElementById('carpetaArchivos').files;
                                    const umbral = parseFloat(document.getElementById('umbralSimilitud').value);

                                    if (!archivoExcel) {
                                        alert('Por favor, selecciona un archivo Excel');
                                        return;
                                    }

                                    if (!columnasExcel) {
                                        alert('Por favor, indica las columnas a buscar');
                                        return;
                                    }

                                    if (archivos.length === 0) {
                                        alert('Por favor, selecciona una carpeta con archivos');
                                        return;
                                    }

                                    // Obtener los nombres del Excel
                                    const nombres = await obtenerNombresExcel(archivoExcel, columnasExcel);
                                    console.log('Nombres encontrados:', nombres);

                                    // Revisar coincidencias
                                    const resultados = revisarCoincidencias(archivos, nombres, umbral);
                                    console.log('Resultados:', resultados);

                                    // Mostrar resultados
                                    mostrarResultados(resultados);

                                    // Guardar resultados en variable global para exportación
                                    window.resultadosComparacion = resultados;

                                } catch (error) {
                                    console.error('Error en la comparación:', error);
                                    alert('Error: ' + error.message);
                                }
                            });

                            // Manejar el evento de clic en el botón de exportar
                            btnExportarTodo.addEventListener('click', function() {
                                if (window.resultadosComparacion) {
                                    exportarResultadosCSV(window.resultadosComparacion);
                                } else {
                                    alert('No hay resultados para exportar');
                                }
                            });

                        }, 100);
                        break;
                    case 'envio':
                        content.innerHTML = `
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
                            </div>`;

                        // Configurar funcionalidad después de cargar el contenido
                        setTimeout(() => {
                            // Variables para almacenar datos
                            let excelData = null;
                            let columnasDisponibles = [];
                            let datosListado = [];
                            let destinatarios = [];

                            // Obtener referencias a elementos
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
                                            // Cargar la librería SheetJS desde CDN si no está disponible
                                            if (typeof XLSX === 'undefined') {
                                                await loadScript('https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js');
                                            }

                                            const data = new Uint8Array(e.target.result);
                                            const workbook = XLSX.read(data, { type: 'array' });

                                            // Obtener la primera hoja
                                            const firstSheetName = workbook.SheetNames[0];
                                            const worksheet = workbook.Sheets[firstSheetName];

                                            // Convertir a JSON
                                            const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

                                            // Verificar si hay datos
                                            if (jsonData.length < 2) {
                                                reject(new Error('El archivo Excel no contiene suficientes datos'));
                                                return;
                                            }

                                            // Extraer encabezados (primera fila)
                                            const headers = jsonData[0];

                                            // Extraer filas de datos (excluyendo encabezados)
                                            const rows = jsonData.slice(1);

                                            // Convertir a array de objetos
                                            const dataObjects = rows.map(row => {
                                                const obj = {};
                                                headers.forEach((header, index) => {
                                                    obj[header] = row[index];
                                                });
                                                return obj;
                                            });

                                            resolve({
                                                headers: headers,
                                                data: dataObjects
                                            });
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

                                // Si no existe el contenedor de toasts, lo creamos
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

                                // Configurar el toast
                                toastTitle.textContent = titulo;
                                toastMessage.textContent = mensaje;

                                // Remover clases de color anteriores
                                toastEl.classList.remove('bg-success', 'bg-danger', 'bg-warning', 'bg-info');
                                // Añadir la clase de color correspondiente
                                if (tipo) {
                                    toastEl.classList.add(tipo);
                                }

                                // Mostrar el toast
                                const toast = new bootstrap.Toast(toastEl);
                                toast.show();
                            }

                            // Actualizar listas desplegables con las columnas disponibles
                            function actualizarColumnasDisponibles(headers) {
                                columnasDisponibles = headers;

                                // Actualizar lista desplegable de columna para filtrar
                                columnaFiltro.innerHTML = '<option selected value="">Seleccionar columna</option>';
                                headers.forEach(header => {
                                    columnaFiltro.innerHTML += `<option value="${header}">${header}</option>`;
                                });

                                // Actualizar lista desplegable de columna para ordenar
                                ordenarPor.innerHTML = '<option selected value="">Sin ordenar</option>';
                                headers.forEach(header => {
                                    ordenarPor.innerHTML += `<option value="${header}">${header}</option>`;
                                });

                                // Actualizar lista desplegable de columna de email
                                columnaEmail.innerHTML = '<option selected value="">Seleccionar columna de email</option>';
                                headers.forEach(header => {
                                    columnaEmail.innerHTML += `<option value="${header}">${header}</option>`;
                                });
                            }

                            // Función para filtrar datos según criterios
                            function filtrarDatos(data) {
                                let datosFiltrados = [...data];

                                // Aplicar filtro si se especificó
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

                                // Aplicar ordenamiento si se especificó
                                const colOrden = ordenarPor.value;
                                if (colOrden) {
                                    const ordenDesc = document.getElementById('ordenDescendente').checked;

                                    datosFiltrados.sort((a, b) => {
                                        let valorA = a[colOrden];
                                        let valorB = b[colOrden];

                                        // Intentar ordenar numéricamente si es posible
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
                                // Filtrar columnas según lo especificado
                                let columnasSeleccionadas = columnasDatos.value
                                    .split(',')
                                    .map(col => col.trim())
                                    .filter(col => headers.includes(col));

                                // Si no se especificaron columnas, usar todas
                                if (columnasSeleccionadas.length === 0) {
                                    columnasSeleccionadas = headers;
                                }

                                // Mostrar encabezados
                                encabezadosTabla.innerHTML = '';
                                columnasSeleccionadas.forEach(header => {
                                    encabezadosTabla.innerHTML += `<th>${header}</th>`;
                                });

                                // Filtrar datos según criterios
                                const datosFiltrados = filtrarDatos(data);

                                // Mostrar datos
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

                                // Actualizar contador de filas
                                numFilas.textContent = datosFiltrados.length;

                                // Guardar datos procesados para uso posterior
                                datosListado = datosFiltrados.map(row => {
                                    const newRow = {};
                                    columnasSeleccionadas.forEach(header => {
                                        newRow[header] = row[header];
                                    });
                                    return newRow;
                                });

                                // Mostrar tarjeta de vista previa
                                cardVistaPrevia.style.display = 'block';

                                // Mostrar tarjeta de envío
                                cardEnvio.style.display = 'block';
                            }

                            // Función para agregar un destinatario a la lista
                            function agregarDestinatario(email) {
                                // Validar formato de email
                                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                                if (!emailRegex.test(email)) {
                                    mostrarToast('Error', 'El formato del email no es válido', 'bg-danger');
                                    return;
                                }

                                // Verificar si ya está en la lista
                                if (destinatarios.includes(email)) {
                                    mostrarToast('Advertencia', 'Este email ya está en la lista', 'bg-warning');
                                    return;
                                }

                                // Agregar a la lista
                                destinatarios.push(email);
                                actualizarListaDestinatarios();

                                // Limpiar campo
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

                                // Configurar eventos de los botones de eliminar
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
                                    // Convertir datos a formato para SheetJS
                                    const headers = Object.keys(datosListado[0] || {});
                                    const wsData = [headers, ...datosListado.map(row => headers.map(h => row[h]))];

                                    // Crear libro y hoja
                                    const wb = XLSX.utils.book_new();
                                    const ws = XLSX.utils.aoa_to_sheet(wsData);

                                    // Añadir hoja al libro
                                    XLSX.utils.book_append_sheet(wb, ws, "Listado");

                                    // Generar archivo y descargar
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

                                // Validar que haya un asunto
                                if (!asunto) {
                                    mostrarToast('Error', 'Debe especificar un asunto para el correo', 'bg-danger');
                                    return;
                                }

                                // Validar que haya destinatarios
                                if (destinatarios.length === 0) {
                                    mostrarToast('Error', 'Debe agregar al menos un destinatario', 'bg-danger');
                                    return;
                                }

                                // Si está programado, validar fecha y hora
                                if (programarEnvio.checked) {
                                    const fecha = document.getElementById('fechaProgramada').value;
                                    const hora = document.getElementById('horaProgramada').value;

                                    if (!fecha || !hora) {
                                        mostrarToast('Error', 'Debe especificar fecha y hora para el envío programado', 'bg-danger');
                                        return;
                                    }
                                }

                                // En un entorno real, aquí se enviaría el correo
                                // Como es una simulación, mostramos un mensaje de éxito

                                // Agregar al historial
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

                                // Mostrar mensaje de éxito
                                if (programarEnvio.checked) {
                                    mostrarToast('Éxito', 'El envío ha sido programado correctamente');
                                } else {
                                    mostrarToast('Éxito', 'El listado ha sido enviado correctamente');
                                }

                                // Limpiar formulario
                                document.getElementById('asuntoCorreo').value = '';
                                document.getElementById('cuerpoCorreo').value = '';
                                destinatarios = [];
                                actualizarListaDestinatarios();

                                // Ocultar tarjetas
                                cardVistaPrevia.style.display = 'none';
                                cardEnvio.style.display = 'none';
                            }

                            // Event Listeners

                            // Procesar datos cuando se haga clic en el botón
                            btnProcesarDatos.addEventListener('click', async function() {
                                const archivo = excelFile.files[0];

                                if (!archivo) {
                                    mostrarToast('Error', 'Debe seleccionar un archivo Excel', 'bg-danger');
                                    return;
                                }

                                try {
                                    // Mostrar spinner (en un entorno real)
                                    btnProcesarDatos.disabled = true;
                                    btnProcesarDatos.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Procesando...';

                                    // Cargar y procesar el Excel
                                    excelData = await cargarExcel(archivo);

                                    // Actualizar listas desplegables con las columnas
                                    actualizarColumnasDisponibles(excelData.headers);

                                    // Mostrar vista previa
                                    mostrarVistaPrevia(excelData.headers, excelData.data);

                                    // Restaurar botón
                                    btnProcesarDatos.disabled = false;
                                    btnProcesarDatos.innerHTML = 'Procesar datos';

                                } catch (error) {
                                    console.error('Error procesando Excel:', error);
                                    mostrarToast('Error', 'Error al procesar el archivo: ' + error.message, 'bg-danger');

                                    // Restaurar botón
                                    btnProcesarDatos.disabled = false;
                                    btnProcesarDatos.innerHTML = 'Procesar datos';
                                }
                            });

                            // Exportar a Excel
                            btnExportarExcel.addEventListener('click', exportarAExcel);

                            // Mostrar/ocultar opciones de email del Excel
                            usarEmailExcel.addEventListener('change', function() {
                                columnaEmail.style.display = this.checked ? 'block' : 'none';
                            });

                            // Agregar destinatario
                            btnAgregarDestinatario.addEventListener('click', function() {
                                const email = nuevoDestinatario.value.trim();
                                if (email) {
                                    agregarDestinatario(email);
                                }
                            });

                            // Permitir agregar destinatario con Enter
                            nuevoDestinatario.addEventListener('keypress', function(e) {
                                if (e.key === 'Enter') {
                                    e.preventDefault();
                                    const email = this.value.trim();
                                    if (email) {
                                        agregarDestinatario(email);
                                    }
                                }
                            });

                            // Mostrar/ocultar opciones de formato adjunto
                            adjuntarListado.addEventListener('change', function() {
                                formatoAdjuntoOptions.style.display = this.checked ? 'block' : 'none';
                            });

                            // Mostrar/ocultar opciones de programación
                            programarEnvio.addEventListener('change', function() {
                                opcionesProgramacion.style.display = this.checked ? 'flex' : 'none';
                            });

                            // Volver a procesamiento
                            btnVolverProcesar.addEventListener('click', function() {
                                cardEnvio.style.display = 'none';
                            });

                            // Enviar listado
                            btnEnviarListado.addEventListener('click', enviarListado);

                        }, 100);
                        break;
                    case 'registro':
                        content.innerHTML = `
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
                            </div>`;

                        // Configurar la funcionalidad después de cargar el contenido
                        setTimeout(() => {
                            // Configuración de la API RestDB
                            const API_URL = "https://registros-3feb.restdb.io/rest/documentos";
                            const API_KEY = "67a9d73e020c06b382e65386";

                            // Variable para almacenar los documentos
                            let documentos = [];

                            // Elementos del DOM
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

                                // Configurar el toast
                                toastTitle.textContent = titulo;
                                toastMessage.textContent = mensaje;

                                // Remover clases de color anteriores
                                toastEl.classList.remove('bg-success', 'bg-danger', 'bg-warning', 'bg-info');
                                // Añadir la clase de color correspondiente
                                if (tipo) {
                                    toastEl.classList.add(tipo);
                                }

                                // Mostrar el toast
                                const toast = new bootstrap.Toast(toastEl);
                                toast.show();
                            }

                            // Validar formato de fecha
                            function validarFecha(fechaStr) {
                                try {
                                    // Verificar si la fecha está en formato yyyy-mm-dd
                                    const regex = /^\d{4}-\d{2}-\d{2}$/;
                                    if (!regex.test(fechaStr)) {
                                        return null;
                                    }

                                    // Verificar si es una fecha válida
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

                                    // Formatear la fecha si es necesario
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

                                // Configurar los botones de editar
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

                                // Configurar los botones de eliminar
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

                                // Configurar los botones de PDF (simulado - en un entorno web no podemos generar PDFs como en tkinter)
                                document.querySelectorAll('.btn-pdf').forEach(btn => {
                                    btn.addEventListener('click', (e) => {
                                        const id = e.currentTarget.getAttribute('data-id');
                                        const doc = documentos.find(d => d._id === id);
                                        if (doc) {
                                            mostrarToast('PDF', `Generando PDF para el documento: ${doc.documento}`, 'bg-info');
                                            // Aquí se podría implementar la generación de PDF con una librería para web
                                        }
                                    });
                                });
                            }

                            // Función para agregar documento
                            function agregarDocumento() {
                                const cliente = document.getElementById('cliente').value.trim();
                                const documento = document.getElementById('documento').value.trim();
                                const responsable = document.getElementById('responsable').value.trim();
                                const fecha = document.getElementById('fecha').value;

                                // Validar que los campos no estén vacíos
                                if (!cliente || !documento || !responsable || !fecha) {
                                    mostrarToast('Error', 'Por favor, completa todos los campos', 'bg-danger');
                                    return;
                                }

                                // Validar el formato de la fecha
                                const fechaValida = validarFecha(fecha);
                                if (!fechaValida) {
                                    mostrarToast('Error', 'El formato de la fecha debe ser YYYY-MM-DD', 'bg-danger');
                                    return;
                                }

                                // Crear el objeto de datos
                                const data = {
                                    cliente,
                                    documento,
                                    responsable,
                                    fecha: fechaValida
                                };

                                // Enviar datos a la API
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

                                    // Limpiar los campos del formulario
                                    document.getElementById('cliente').value = '';
                                    document.getElementById('documento').value = '';
                                    document.getElementById('responsable').value = '';
                                    document.getElementById('fecha').value = '';

                                    // Recargar la lista de documentos
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

                                // Validar que los campos no estén vacíos
                                if (!cliente || !documento || !responsable || !fecha) {
                                    mostrarToast('Error', 'Por favor, completa todos los campos', 'bg-danger');
                                    return;
                                }

                                // Validar el formato de la fecha
                                const fechaValida = validarFecha(fecha);
                                if (!fechaValida) {
                                    mostrarToast('Error', 'El formato de la fecha debe ser YYYY-MM-DD', 'bg-danger');
                                    return;
                                }

                                // Crear el objeto de datos actualizado
                                const data = {
                                    cliente,
                                    documento,
                                    responsable,
                                    fecha: fechaValida
                                };

                                // Enviar datos actualizados a la API
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

                                    // Cerrar el modal
                                    const modal = bootstrap.Modal.getInstance(document.getElementById('editarDocumentoModal'));
                                    modal.hide();

                                    // Recargar la lista de documentos
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

                                    // Cerrar el modal
                                    const modal = bootstrap.Modal.getInstance(document.getElementById('confirmarEliminarModal'));
                                    modal.hide();

                                    // Recargar la lista de documentos
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
                        }, 100);
                        break;
                    case 'manual':
                        content.innerHTML = `
                            <div class="page-header">
                                <h3 class="animated-title">MODO DE USO</h3>
                                <div class="header-underline"></div>
                            </div>
                            
                            <div class="accordion" id="manualAcordeon">
                                <!-- Renombrado -->
                                <div class="accordion-item">
                                    <h2 class="accordion-header">
                                        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#renombradoGuia">
                                            Renombrado de Archivos
                                        </button>
                                    </h2>
                                    <div id="renombradoGuia" class="accordion-collapse collapse show">
                                        <div class="accordion-body">
                                            <h5>Pasos para renombrar archivos:</h5>
                                            <ol>
                                                <li>Selecciona los archivos arrastrándolos o usando el botón "Seleccionar archivos"</li>
                                                <li>Define el patrón de búsqueda (opcional)</li>
                                                <li>Especifica el patrón de reemplazo con las variables disponibles ($index, $date)</li>
                                                <li>Configura las opciones adicionales (numeración, formato)</li>
                                                <li>Usa "Vista previa" para verificar los cambios</li>
                                                <li>Haz clic en "Renombrar" para aplicar los cambios</li>
                                            </ol>
                                            
                                            <h5 class="mt-4">Solución de problemas:</h5>
                                            <ul class="list-group">
                                                <li class="list-group-item">
                                                    <strong>Los archivos no aparecen:</strong> Verifica que el formato sea compatible
                                                </li>
                                                <li class="list-group-item">
                                                    <strong>Error en el renombrado:</strong> Asegúrate de que los nombres nuevos no existan
                                                </li>
                                                <li class="list-group-item">
                                                    <strong>Patrones no funcionan:</strong> Revisa la sintaxis del patrón de búsqueda
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <!-- Comparación -->
                                <div class="accordion-item">
                                    <h2 class="accordion-header">
                                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#comparacionGuia">
                                            Comparación de Nombres
                                        </button>
                                    </h2>
                                    <div id="comparacionGuia" class="accordion-collapse collapse">
                                        <div class="accordion-body">
                                            <h5>Pasos para comparar nombres:</h5>
                                            <ol>
                                                <li>Selecciona el archivo Excel con los nombres de referencia</li>
                                                <li>Indica las columnas que contienen los nombres</li>
                                                <li>Selecciona la carpeta con los archivos a comparar</li>
                                                <li>Ajusta el umbral de similitud según necesites</li>
                                                <li>Haz clic en "Comparar nombres"</li>
                                            </ol>

                                            <h5 class="mt-4">Solución de problemas:</h5>
                                            <ul class="list-group">
                                                <li class="list-group-item">
                                                    <strong>Excel no se carga:</strong> Verifica el formato del archivo (.xlsx)
                                                </li>
                                                <li class="list-group-item">
                                                    <strong>No hay coincidencias:</strong> Prueba reduciendo el umbral de similitud
                                                </li>
                                                <li class="list-group-item">
                                                    <strong>Coincidencias incorrectas:</strong> Aumenta el umbral de similitud
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <!-- Envío de Listados -->
                                <div class="accordion-item">
                                    <h2 class="accordion-header">
                                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#envioGuia">
                                            Envío de Listados
                                        </button>
                                    </h2>
                                    <div id="envioGuia" class="accordion-collapse collapse">
                                        <div class="accordion-body">
                                            <h5>Pasos para enviar listados:</h5>
                                            <ol>
                                                <li>Carga el archivo Excel con los datos</li>
                                                <li>Selecciona las columnas a incluir</li>
                                                <li>Aplica filtros si es necesario</li>
                                                <li>Configura los destinatarios del correo</li>
                                                <li>Redacta el asunto y mensaje</li>
                                                <li>Programa el envío si lo deseas</li>
                                                <li>Haz clic en "Enviar listado"</li>
                                            </ol>

                                            <h5 class="mt-4">Solución de problemas:</h5>
                                            <ul class="list-group">
                                                <li class="list-group-item">
                                                    <strong>Error en el procesamiento:</strong> Verifica el formato de las columnas
                                                </li>
                                                <li class="list-group-item">
                                                    <strong>Correos no llegan:</strong> Revisa que las direcciones sean correctas
                                                </li>
                                                <li class="list-group-item">
                                                    <strong>Filtros no funcionan:</strong> Comprueba el tipo de datos de la columna
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <!-- Registro de Documentos -->
                                <div class="accordion-item">
                                    <h2 class="accordion-header">
                                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#registroGuia">
                                            Registro de Documentos
                                        </button>
                                    </h2>
                                    <div id="registroGuia" class="accordion-collapse collapse">
                                        <div class="accordion-body">
                                            <h5>Pasos para registrar documentos:</h5>
                                            <ol>
                                                <li>Completa los datos del nuevo registro</li>
                                                <li>Verifica que la fecha tenga el formato correcto</li>
                                                <li>Haz clic en "Agregar documento"</li>
                                                <li>Confirma que aparezca en la lista</li>
                                            </ol>

                                            <h5 class="mt-4">Solución de problemas:</h5>
                                            <ul class="list-group">
                                                <li class="list-group-item">
                                                    <strong>No se guarda el registro:</strong> Verifica que todos los campos estén completos
                                                </li>
                                                <li class="list-group-item">
                                                    <strong>Error en la fecha:</strong> Usa el formato YYYY-MM-DD
                                                </li>
                                                <li class="list-group-item">
                                                    <strong>No se actualiza la lista:</strong> Usa el botón "Actualizar lista"
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>`;
                        break;
                    default:
                        content.innerHTML = `
                            <div class="page-header">
                                <h3 class="animated-title">${page.toUpperCase()}</h3>
                                <div class="header-underline"></div>
                            </div>
                            <div class="card shadow-sm p-4 mt-4">
                                <p class="lead">Contenido de la aplicación ${page}.</p>
                                <p>Esta es una demostración del contenido para la sección de ${page}. Aquí podrás gestionar todas las funcionalidades relacionadas.</p>
                            </div>`;
                }
            }, 800);
        }
    }

    function setActiveLink(activeLink) {
        links.forEach(link => link.classList.remove("active"));
        activeLink.classList.add("active");
    }

    // Efecto hover para los elementos del menú
    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            if (!link.classList.contains('active')) {
                link.style.transform = 'translateX(5px)';
            }
        });

        link.addEventListener('mouseleave', () => {
            if (!link.classList.contains('active')) {
                link.style.transform = 'translateX(0)';
            }
        });
    });
});