export const Renombrado = () => {
    return `
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
    `;
};

export const setupRenombrado = () => {
    let selectedFiles = [];
    let previewRenames = [];

    const fileDrop = document.getElementById('fileDrop');
    const fileInput = document.getElementById('fileInput');
    const selectFilesBtn = document.getElementById('selectFilesBtn');
    const clearFilesBtn = document.getElementById('clearFilesBtn');
    const dropText = document.getElementById('dropText');
    const filesCount = document.getElementById('filesCount');
    const previewContainer = document.getElementById('previewContainer');
    const previewTableBody = document.getElementById('previewTableBody');
    const previewBtn = document.getElementById('previewBtn');
    const renameBtn = document.getElementById('renameBtn');
    const renameCount = document.getElementById('renameCount');

    // Drag and Drop
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
        selectedFiles = Array.from(e.dataTransfer.files);
        updateSelectedFilesUI();
    });

    // Selección de archivos
    selectFilesBtn.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', () => {
        if (fileInput.files.length > 0) {
            selectedFiles = Array.from(fileInput.files);
            updateSelectedFilesUI();
        }
    });

    // Limpiar selección
    clearFilesBtn.addEventListener('click', () => {
        selectedFiles = [];
        previewRenames = [];
        updateSelectedFilesUI();
        fileInput.value = '';
    });

    // Vista previa
    previewBtn.addEventListener('click', generatePreview);

    // Renombrar
    renameBtn.addEventListener('click', executeRename);

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
        }
    }

    function generatePreview() {
        if (selectedFiles.length === 0) {
            alert('No hay archivos seleccionados para renombrar');
            return;
        }

        previewRenames = [];
        previewTableBody.innerHTML = '';

        selectedFiles.forEach((file, index) => {
            const newName = generateNewName(file.name, index);
            previewRenames.push({ originalFile: file, newName });

            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="text-truncate" title="${file.name}">${file.name}</td>
                <td class="text-truncate" title="${newName}">${newName}</td>
            `;
            previewTableBody.appendChild(row);
        });

        previewContainer.style.display = 'block';
        renameBtn.disabled = false;
        renameCount.textContent = `(${previewRenames.length})`;
    }

    function generateNewName(originalName, index) {
        const replacePattern = document.getElementById('replacePattern').value;
        const startNumber = parseInt(document.getElementById('startNumber').value, 10) || 0;
        const padding = parseInt(document.getElementById('padding').value, 10) || 2;
        const fileExtension = document.getElementById('fileExtension').value;
        const dateFormat = document.getElementById('dateFormat').value;

        let newName = replacePattern
            .replace('$index', String(startNumber + index).padStart(padding, '0'))
            .replace('$date', formatDate(dateFormat));

        const lastDotIndex = originalName.lastIndexOf('.');
        const fileName = lastDotIndex === -1 ? originalName : originalName.substring(0, lastDotIndex);
        const ext = lastDotIndex === -1 ? '' : originalName.substring(lastDotIndex);

        newName += fileExtension || ext;

        return newName;
    }

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

    function executeRename() {
        if (previewRenames.length === 0) {
            alert('Genera una vista previa antes de renombrar');
            return;
        }

        alert(`Simulación: Se renombraron ${previewRenames.length} archivos correctamente`);
        selectedFiles = [];
        previewRenames = [];
        updateSelectedFilesUI();
    }
};