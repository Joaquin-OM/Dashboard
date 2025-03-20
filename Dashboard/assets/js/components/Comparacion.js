export const Comparacion = () => {
    return `
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
        </div>
    `;
};

export const setupComparacion = () => {
    const umbralSimilitud = document.getElementById('umbralSimilitud');
    const valorUmbral = document.getElementById('valorUmbral');
    const btnCompararNombres = document.getElementById('btnCompararNombres');
    const resultadosCard = document.getElementById('resultadosCard');
    const btnExportarTodo = document.getElementById('btnExportarTodo');

    umbralSimilitud.addEventListener('input', function() {
        valorUmbral.textContent = this.value;
    });

    btnCompararNombres.addEventListener('click', async function() {
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

        try {
            const nombres = await obtenerNombresExcel(archivoExcel, columnasExcel);
            const resultados = revisarCoincidencias(archivos, nombres, umbral);
            mostrarResultados(resultados);
            window.resultadosComparacion = resultados;
        } catch (error) {
            console.error('Error en la comparación:', error);
            alert('Error: ' + error.message);
        }
    });

    btnExportarTodo.addEventListener('click', function() {
        if (window.resultadosComparacion) {
            exportarResultadosCSV(window.resultadosComparacion);
        } else {
            alert('No hay resultados para exportar');
        }
    });

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

    async function procesarExcel(data, columnas) {
        if (typeof XLSX === 'undefined') {
            await loadScript('https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js');
        }

        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        const nombres = [];
        jsonData.forEach(row => {
            columnas.forEach(columna => {
                if (row[columna] && typeof row[columna] === 'string' && row[columna].trim() !== '') {
                    nombres.push(row[columna].trim());
                }
            });
        });

        return nombres.filter(nombre => nombre !== undefined);
    }

    function revisarCoincidencias(archivos, nombresClientes, umbralSimilitud) {
        const coincidencias = [];
        const soloArchivos = [];

        for (const archivo of archivos) {
            const nombreArchivo = archivo.name.slice(0, archivo.name.lastIndexOf('.'));
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

        const archivosConCoincidencia = coincidencias.map(c => c.coincidencia);
        const soloExcel = nombresClientes.filter(nombre => !archivosConCoincidencia.includes(nombre));

        return { coincidencias, soloArchivos, soloExcel };
    }

    function calcularSimilitud(str1, str2) {
        if (str1 === str2) return 1.0;

        const len1 = str1.length;
        const len2 = str2.length;

        const distanciaLevenshtein = (s1, s2) => {
            const matriz = Array(s1.length + 1).fill().map(() => Array(s2.length + 1).fill(0));

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

        const distancia = distanciaLevenshtein(str1, str2);
        return 1 - (distancia / Math.max(len1, len2));
    }

    function mostrarResultados(resultados) {
        document.getElementById('textoResumen').textContent = `Se encontraron ${resultados.coincidencias.length} coincidencias, ${resultados.soloExcel.length} nombres solo en Excel y ${resultados.soloArchivos.length} archivos sin coincidencia.`;

        document.getElementById('numCoincidencias').textContent = resultados.coincidencias.length;
        document.getElementById('numSoloExcel').textContent = resultados.soloExcel.length;
        document.getElementById('numSoloArchivos').textContent = resultados.soloArchivos.length;

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

        const soloExcelTabla = document.getElementById('soloExcelTabla');
        soloExcelTabla.innerHTML = '';

        resultados.soloExcel.forEach(nombre => {
            const tr = document.createElement('tr');
            tr.innerHTML = `<td>${nombre}</td>`;
            soloExcelTabla.appendChild(tr);
        });

        const soloArchivosTabla = document.getElementById('soloArchivosTabla');
        soloArchivosTabla.innerHTML = '';

        resultados.soloArchivos.forEach(archivo => {
            const tr = document.createElement('tr');
            tr.innerHTML = `<td>${archivo}</td>`;
            soloArchivosTabla.appendChild(tr);
        });

        resultadosCard.style.display = 'block';
    }

    function exportarResultadosCSV(resultados) {
        let csv = "Tipo,Archivo/Nombre,Coincidencia,Similitud\n";

        resultados.coincidencias.forEach(c => {
            csv += `Coincidencia,"${c.archivo}","${c.coincidencia}",${c.similitud}\n`;
        });

        resultados.soloExcel.forEach(nombre => {
            csv += `Solo en Excel,"${nombre}",,\n`;
        });

        resultados.soloArchivos.forEach(archivo => {
            csv += `Solo en Archivos,"${archivo}",,\n`;
        });

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

    function loadScript(src) {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = src;
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }
};