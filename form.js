document.addEventListener("DOMContentLoaded", function () {
  const rutInput = document.getElementById("rut");

  rutInput.addEventListener("input", function () {
    const limpio = rutInput.value.replace(/\D/g, "");
    if (limpio.length > 1) {
      rutInput.value = formatearRut(limpio);
    }
  });

  document.getElementById("data-form").addEventListener("submit", async function (e) {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const edad = document.getElementById("edad").value.trim();
    let rut = document.getElementById("rut").value.trim();
    const ejercicio = document.getElementById("ejercicio").value.trim();

    if (nombre === "" || edad === "" || rut === "" || ejercicio === "") {
      alert("⚠️ Por favor completa todos los campos.");
      return;
    }

    if (isNaN(edad) || parseInt(edad) <= 0) {
      alert("⚠️ Ingresa una edad válida.");
      return;
    }

    rut = formatearRut(rut.replace(/\D/g, ""));

    if (!validarRut(rut)) {
      alert("⚠️ Ingresa un RUT válido (ej: 12.345.678-5).");
      return;
    }

    const datosUsuario = {
      nombre,
      edad: parseInt(edad),
      rut,
      ejercicio
    };

    try {
      const response = await fetch("https://sheetdb.io/api/v1/g2nyucfv6eao0", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ data: datosUsuario })
      });

      if (!response.ok) {
        throw new Error("No se pudo guardar en SheetDB");
      }

      console.log("✅ Datos guardados en SheetDB:", datosUsuario);

      // Ocultar formulario y mostrar sistema
      document.getElementById("data-form").style.display = "none";
      startSystem = true;
      setup();
      loop();

    } catch (error) {
      console.error("❌ Error al guardar en SheetDB:", error);
      alert("Hubo un problema al guardar los datos. Inténtalo de nuevo.");
    }
  });
});

/**
 * Valida un RUT chileno.
 */
function validarRut(rut) {
  rut = rut.replace(/\./g, "").replace(/-/g, "").toUpperCase();

  if (!/^[0-9]+[0-9K]$/.test(rut)) return false;

  const cuerpo = rut.slice(0, -1);
  const dv = rut.slice(-1);

  let suma = 0;
  let multiplo = 2;

  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += parseInt(cuerpo[i]) * multiplo;
    multiplo = multiplo === 7 ? 2 : multiplo + 1;
  }

  const dvEsperado = 11 - (suma % 11);
  const dvFinal = dvEsperado === 11 ? "0" : dvEsperado === 10 ? "K" : dvEsperado.toString();

  return dv === dvFinal;
}

/**
 * Formatea un RUT chileno sin puntos ni guión a formato 12.345.678-9
 */
function formatearRut(rut) {
  rut = rut.replace(/\D/g, "");

  if (rut.length < 2) return rut;

  const cuerpo = rut.slice(0, -1);
  const dv = rut.slice(-1);
  let cuerpoFormateado = "";

  let i = 0;
  for (let j = cuerpo.length; j > 0; j -= 3) {
    const inicio = Math.max(0, j - 3);
    const segmento = cuerpo.slice(inicio, j);
    cuerpoFormateado = (inicio > 0 ? "." : "") + segmento + cuerpoFormateado;
    i++;
  }

  return `${cuerpoFormateado}-${dv}`;
}
