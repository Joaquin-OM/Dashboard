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
    `;
};