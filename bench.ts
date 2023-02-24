(async function () {
  async function testEndpoints() {
    const endpoint1 = new URL(
      "http://127.0.0.1:3000/cursor?cursor=7aa5e576-5d36-43db-acdc-cf8d69f90417&limit=10"
    );
    const endpoint2 = new URL(
      "http://127.0.0.1:3000/offset?offset=1150000&limit=10"
    );
    const numTests = 1000;

    // Almacenar los tiempos de respuesta de cada prueba en dos arreglos
    const times1: number[] = [];
    const times2: number[] = [];

    // Realiza la prueba para cada endpoint y almacena los tiempos de respuesta
    for (let i = 0; i < numTests; i++) {
      // Endpoint 1
      console.count("Cycle");
      const start1 = Date.now();
      await fetch(endpoint1);
      const end1 = Date.now();
      const time1 = end1 - start1;
      times1.push(time1);

      // Endpoint 2
      const start2 = Date.now();
      await fetch(endpoint2);
      const end2 = Date.now();
      const time2 = end2 - start2;
      times2.push(time2);
    }

    // Calcula la mediana de los tiempos de respuesta y la muestra en la consola
    const medianTime1 = getMedian(times1.slice(0, -1));
    const avgTime1 = getAverage(times1.slice(0, -1));
    const medianTime2 = getMedian(times2.slice(0, -1));
    const avgTime2 = getAverage(times2.slice(0, -1));
    console.log(
      `
  Cursor
    median: ${medianTime1} ms
    avg: ${avgTime1.toFixed(2)} ms

  Offset
    median: ${medianTime2} ms
    avg: ${avgTime2.toFixed(2)} ms
`
    );
  }

  function getAverage(arr: number[]) {
    return arr.reduce((a, b) => a + b, 0) / arr.length;
  }

  function getMedian(values: number[]): number {
    values.sort((a, b) => a - b);
    const half = Math.floor(values.length / 2);
    if (values.length % 2 === 0) {
      return (values[half - 1] + values[half]) / 2;
    } else {
      return values[half];
    }
  }

  try {
    testEndpoints();
  } catch (e) {
    console.error(e);
  }
})();
