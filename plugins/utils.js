import moment from 'moment';
import slugify from 'slugify';
const pluralExceptions = { "dia útil": "dias úteis" };

export default defineNuxtPlugin((nuxtApp) => {
  const plural = (qtd, word, includeQtd = true) => {
    const pluralException = pluralExceptions[word];

    const isPlural = qtd !== 1;

    if (isPlural && pluralException) {
      return `${includeQtd ? qtd + " " : ""}${pluralException}`;
    }

    const plural = isPlural ? "s" : "";
    return `${includeQtd ? qtd + " " : ""}${word}${plural}`;
  };

  const hexToRgba = (hex, alpha) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    if (alpha) {
      return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
    } else {
      return "rgb(" + r + ", " + g + ", " + b + ")";
    }
  };

  const formatDate = (value, format = 'DD/MM/YYYY') => {
    if (!value) {
      return "";
    }
    return moment(value).format(format);
  };

  const downloadCSV = (data, filename) => {
    const toCsvField = (value) => {
      const normalized = value === undefined || value === null ? "" : String(value);
      return `"${normalized.replace(/"/g, '""')}"`;
    };
    const csv = [];
    for (const line of data) {
      const newLine = []
      for (const column of line) {
        newLine.push(toCsvField(column));
      }
      csv.push(newLine.join(","));
    }

    let file = filename;
    file += ".csv";
    const blob = new Blob([csv.join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = slugify(filename, { lower: true });
    a.click();
  }

  return {
    provide: {
      utils: {
        plural,
        hexToRgba,
        formatDate,
        downloadCSV,
      },
    },
  };
});
