import moment from 'moment';
import Constants from 'expo-constants';

const { manifest } = Constants;
export const getLocalIP = () => {
  return manifest.debuggerHost.split(':')[0];
};

export function monetize(n) {
  if (n && typeof n === 'number')
    return `R$ ${n
      .toFixed(2) // casas decimais
      .replace('.', ',')
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}`;
}

export function capitalize(str) {
  if (str)
    return str.replace(
      /\w\S*/g,
      txt =>
        txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(),
    );
}

export function cnpj(value) {
  if (value)
    return value
      .replace(/\D/g, '') // substitui qualquer caracter que nao seja numero por nada
      .replace(/(\d{2})(\d)/, '$1.$2') // captura 2 grupos de numero o primeiro de 3 e o segundo de 1, apos capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de numero
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1/$2')
      .replace(/(\d{4})(\d{1,2})/, '$1-$2');
}

export const weekDaysEnPt = {
  monday: 'Segunda',
  tuesday: 'Terça',
  wednesday: 'Quarta',
  thursday: 'Quinta',
  friday: 'Sexta',
  saturday: 'Sábado',
  sunday: 'Domingo',
};

export function validateCnpj(cnpj) {
  if (cnpj) {
    cnpj = cnpj.replace(/[^\d]+/g, '');

    if (cnpj == '') return false;

    if (cnpj.length != 14) return false;

    // Elimina CNPJs invalidos conhecidos
    if (
      cnpj == '00000000000000' ||
      cnpj == '11111111111111' ||
      cnpj == '22222222222222' ||
      cnpj == '33333333333333' ||
      cnpj == '44444444444444' ||
      cnpj == '55555555555555' ||
      cnpj == '66666666666666' ||
      cnpj == '77777777777777' ||
      cnpj == '88888888888888' ||
      cnpj == '99999999999999'
    )
      return false;

    // Valida DVs
    tamanho = cnpj.length - 2;
    numeros = cnpj.substring(0, tamanho);
    digitos = cnpj.substring(tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2) pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado != digitos.charAt(0)) return false;

    tamanho += 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2) pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado != digitos.charAt(1)) return false;

    return true;
  }
}

export function cpf(v) {
  if (v) v = v.replace(/\D/g, ''); // Remove tudo o que não é dígito
  v = v.replace(/(\d{3})(\d)/, '$1.$2'); // Coloca um ponto entre o terceiro e o quarto dígitos
  v = v.replace(/(\d{3})(\d)/, '$1.$2'); // Coloca um ponto entre o terceiro e o quarto dígitos
  // de novo (para o segundo bloco de números)
  v = v.replace(/(\d{3})(\d{1,2})$/, '$1-$2'); // Coloca um hífen entre o terceiro e o quarto dígitos
  return v;
}

export function date(date) {
  if (date) return moment(date).format('DD/MM/YYYY');
}

export function diffDates(date1, date2) {
  const pastDate = moment(date2);
  const today = moment(date1);
  return today.diff(pastDate, 'days');
}

export function handleWorkHours(days) {
  let isOpen = false;
  let lastBlockTime = null;
  const weekDaysPt = [
    '',
    'Segunda',
    'Terça',
    'Quarta',
    'Quinta',
    'Sexta',
    'Sábado',
    'Domingo',
  ];

  const weekDaysEn = [
    '',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
    'sunday',
  ];

  if (days) {
    const periods = {};
    const uniqueDays = [...new Set(days.map(item => item.day))];

    days.map(day => {
      uniqueDays.map(uniqueDay => {
        if (day.day === uniqueDay) {
          if (periods[day.day]) {
            periods[day.day] = {
              period: [
                ...periods[day.day].period,
                { start: day.start, end: day.end },
              ],
            };
          } else {
            periods[day.day] = {
              period: [{ start: day.start, end: day.end }],
            };
          }
        }
      });
    });

    const currentDayOfWeek = moment().isoWeekday();
    const startTime = moment(Date.now());

    if (periods[weekDaysEn[currentDayOfWeek]]) {
      //check if there's any period block for a company
      // eslint-disable-next-line no-unused-expressions
      periods[weekDaysEn[currentDayOfWeek]]?.period.map(
        (singlePeriod, index) => {
          const startTime = moment(Date.now());
          const beforeTime = moment(
            singlePeriod.start,
            'HH.mm.ss',
          ).subtract(3, 'hours');
          const afterTime = moment(
            singlePeriod.end,
            'HH.mm.ss',
          ).subtract(3, 'hours');
          const between = startTime.isBetween(beforeTime, afterTime);
          if (
            index ===
            periods[weekDaysEn[currentDayOfWeek]]?.period.length - 1
          ) {
            lastBlockTime = afterTime;
          }
          isOpen = between;
        },
      );
    } else {
      return null;
    }
    const durationTime = moment.duration(
      moment(lastBlockTime).diff(moment().subtract('3', 'hours')),
    );

    const shortMessage = `, fecha às ${moment(lastBlockTime)
      .add('3', 'hours')
      .format('HH:mm')}`;

    console.tron.log(lastBlockTime);

    return {
      day: {
        [weekDaysEn[currentDayOfWeek]]: weekDaysPt[currentDayOfWeek],
      },
      dayPeriod: [periods[weekDaysEn[currentDayOfWeek]]],
      allDays: periods,
      isOpen,
      shortMessage,
    };
  }
}

export default {
  monetize,
  capitalize,
  cpf,
  weekDaysEnPt,
  date,
  cnpj,
  diffDates,
  handleWorkHours,
};
