/**
 * @file Reporte de Web Vitals.
 * @description Mide las métricas de rendimiento de la aplicación y las envía a una función de callback.
 * @param {function} onPerfEntry - La función que se llamará con cada métrica de rendimiento.
 */
const reportWebVitals = onPerfEntry => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

export default reportWebVitals;
