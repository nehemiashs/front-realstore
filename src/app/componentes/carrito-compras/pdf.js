document.addEventListener("DOMContentLoaded", () => {
  // Escuchamos el click del botón
  const $boton = document.querySelector("#pdf");
  $boton.addEventListener("click", () => {
      const $elementoParaConvertir = document.getElementById('factura'); // <-- Aquí puedes elegir cualquier elemento del DOM
      html2pdf()
          .set({
              margin: .2,
              filename: 'RealStore_'+document.getElementById('idpedido').innerHTML+'.pdf',
              image: {
                  type: 'jpeg',
                  quality: 0.98
              },
              html2canvas: {
                  scale: 5, // A mayor escala, mejores gráficos, pero más peso
                  letterRendering: true
              },
              jsPDF: {
                  unit: "in",
                  format: "a4",
                  orientation: 'landscape' // landscape o portrait
              }
          })
          .from($elementoParaConvertir)
          .save()
          .catch(err => console.log(err))
          .finally()
          .then(()=>{
              console.log('Guardado!');
          });

  });
});
