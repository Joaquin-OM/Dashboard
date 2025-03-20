export const Manual = () => {
    return `
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
        </div>
    `;
};