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