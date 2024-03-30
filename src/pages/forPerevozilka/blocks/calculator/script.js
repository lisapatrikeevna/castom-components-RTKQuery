/**********************************************************************
 Калькулятор расчета стоимости доставки грузов.
 Разработка и авторские права: www.mobile-island.narod.ru
 E-mail: mobile-island@yandex.ru
 ***********************************************************************/
// Важно!
// Все текстовые данные должны находиться внутри двойных или одинарных кавычек.
// Если в Вашем тексте встречаются одинарные кавычки, то такая строка должна быть внутри двойных кавычкек и наоборот.

function startCalculator() {
  /***** Настройки калькулятора *****/
  var loaderCost = 300; // стоимость работы 1-го грузчика в час, в руб.
  // координаты широты и долготы вашей фирмы на карте в десятичных градусах.
  var calcCoordX = 55.7522200;
  var calcCoordY = 37.6155600;
  var imgPath = 'pic'; // путь к папке с изображеними.
  var itemA = [
     {
    'avtoName': 'Каблук (0,5 тонны, 2,5 куб. м)', // название авто.
    'tarif': ['30мин=800|30мин=900', '1час=1000|1час=800', '2часа=1300|1час=700', '3часа=1800|1час=600', '4часа=2100|1час=500'], // стоимость авто, где ["время=тариф|дополнительное время=цена"].
    'avtoCostKm': 50, // стоимость 1 км пробега, в руб.
    'avtoPic': 'cabluk_01.jpg', // фото авто из папки calculator/pic/.
    'avtoDesc': 'Эти небольшие автомобили чрезвычайно надежны в эксплуатации. Небольшой расход топлива и общая небольшая стоимость автоперевозок на «каблуке» (средняя цена сравнима со стоимостью услуг пассажирского такси) относятся к его экономическим преимуществам.' // дополнительная информация.
  }, {
    'avtoName': 'Газель-тент (1,5 тонны, 9 куб. м)', // название авто.
    'tarif': ['30мин=990|30мин=900', '1час=1390|1час=800', '2часа=1690|1час=700', '3часа=2190|1час=600', '4часа=2490|1час=500'], // стоимость авто, где ["время=тариф|дополнительное время=цена"].
    'avtoCostKm': 50, // стоимость 1 км пробега, в руб.
    'avtoPic': 'gazel_tent.jpg', // фото авто из папки calculator/pic/.
    'avtoDesc': 'Тентованная газель имеет длину кузова 3 метра и высоту тента 1м 60 см., грузоподьемность газель тент 1,5 тонны, тентованные газели оборудованные для перевозки мебели, имеются ремни, прокладочный материал.' // дополнительная информация.
  }, {
    'avtoName': 'Бычок (3 тонны, 30 куб. м)', // название авто.
    'tarif': ['30мин=990|30мин=900', '1час=990|1час=900', '2часа=990|1час=900', '3часа=990|1час=900', '4часа=990|1час=900', '5часов=990|1час=900'], // стоимость авто, где ["время=тариф|дополнительное время=цена"].
    'avtoHourMin': 1, // минимальное время заказа авто, в часах.
    'avtoCostKm': 50, // стоимость 1 км пробега, в руб.
    'avtoPic': 'bychok.jpg', // фото авто из папки calculator/pic/.
    'avtoDesc': 'Грузоподьемность машины до 3 тонн. Бортовой Бычок длина от 4, 5, 6 метров 18 кубов. Закрытый Бычок до 30 кубов. Открытый бычок занимаемся перевозкой станков, стройматериалов, строительных грузов, досок, бревен и т.п.' // дополнительная информация.
  }, {
    'avtoName': 'ГАЗ (5 тонн, 25 куб. м)', // название авто.
    'tarif': ['30мин=990|30мин=900', '1час=990|1час=900', '2часа=990|1час=900', '3часа=990|1час=900', '4часа=990|1час=900', '5часов=990|1час=900'], // стоимость авто, где ["время=тариф|дополнительное время=цена"].
    'avtoCostKm': 50, // стоимость 1 км пробега, в руб.
    'avtoPic': 'gaz56.jpg', // фото авто из папки calculator/pic/.
    'avtoDesc': 'Газ Бортовой 5 тонн. Открытый Газ, машина длина которого составляет 6 метров, нарощенные борта, есть брезент, ремни крепления груза, полы кузова деревянные что позволяет перевозить катушки с кабеля.' // дополнительная информация.
  }, {
    'avtoName': 'Камаз (10 тонн, 36 куб. м)', // название авто.
    'tarif': ['30мин=990|30мин=900', '1час=990|1час=900', '2часа=990|1час=900', '3часа=990|1час=900', '4часа=990|1час=900', '5часов=990|1час=900'], // стоимость авто, где ["время=тариф|дополнительное время=цена"].
    'avtoCostKm': 50, // стоимость 1 км пробега, в руб.
    'avtoPic': 'kamaz.jpg', // фото авто из папки calculator/pic/.
    'avtoDesc': 'Камаз бортовой от 6 м, 9 м, 12 м, 13, 5 м. Бортовая машина для грузоперевозки тяжелых габаритных грузов. Камаз перевозит разные грузы плиты, трубы, бытовки, доски, железо, конструкции и т.д.' // дополнительная информация.
  }, {
    'avtoName': 'Фура (20 тонн, 80 куб. м)', // название авто.
    'tarif': ['30мин=990|30мин=900', '1час=990|1час=900', '2часа=990|1час=900', '3часа=990|1час=900', '4часа=990|1час=900', '5часов=990|1час=900'], // стоимость авто, где ["время=тариф|дополнительное время=цена"].
    'avtoCostKm': 50, // стоимость 1 км пробега, в руб.
    'avtoPic': 'kamazfura.jpg', // фото авто из папки calculator/pic/.
    'avtoDesc': 'Камаз еврофура, длина составляет 12,13,5 метров, от 60 до 120 кубов, грузоподьемность до 20 тонн, рагрузка верхняя и боковая' // дополнительная информация.
  } // здесь запятая не ставится, т.к. это последний элемент.
  ];

  // элементы
  var calcavtoKmE = document.getElementById('calcavtoKmE');

  var calcLoaderQuantE = document.getElementById('calcLoaderQuantE');
  var calcLoaderHourE = document.getElementById('calcLoaderHourE');

  var avtoSumavtoE = document.getElementById('avtoSumavtoE');
  var avtoSumKmE = document.getElementById('avtoSumKmE');
  var avtoSumLoaderE = document.getElementById('avtoSumLoaderE');
  var avtoSumFullE = document.getElementById('avtoSumFullE');

  var calculateE = document.getElementById('calculateBtn');

  var calcAvtoTypeE = document.getElementById('calcAvtoTypeE');
  var calcAvtoTarif = document.getElementsByClassName('calcAvtoTarif')[0];
  var calcShowavtoPicE = document.getElementById('calcShowavtoPicE');
  var avtoDescE = document.getElementById('avtoDescE');

  var from = document.getElementById('from');
  var point_1 = document.getElementById('point_1');
  var point_2 = document.getElementById('point_2');
  var point_3 = document.getElementById('point_3');
  var to = document.getElementById('to');
  var letter = 'ABCDE';
  var calcAddPoint = document.getElementsByClassName('calcAddPoint')[0];
  var showAddPoint = document.getElementsByClassName('showAddPoint')[0];

  // showAddPoint.onclick = function() {
  //   calcAddPoint.style.display = 'inline-block';
  // }
  // заполняем select "Тип авто"
  var opt = '';
  for(var i = 0; i < itemA.length; i++) {
    opt += '<option value=' + i + '>' + itemA[i]['avtoName'] + '</option>';
  }
  calcAvtoTypeE.innerHTML += opt;

  function onchangeAvtoType() {
    var pos = calcAvtoTypeE[calcAvtoTypeE.selectedIndex].value;
    // заполнение поля "Дополнительная информация"
    calcShowavtoPicE.src = imgPath + '/' + itemA[pos].avtoPic;
    calcShowavtoPicE.style.display = 'inline-block';
    avtoDescE.innerHTML = itemA[pos].avtoDesc;
    // заполнение поля "Время заказа авто"
    var opt = '';
    for(var j = 0; j < itemA[pos]['tarif'].length; j++) { // количество тарифов
      var arr = itemA[pos]['tarif'][j].split('|');
      var tarifA = arr[0].split('='); // основной тариф
      var tarifSuppA = arr[1].split('='); // дополнительное время
      opt += '<option value=' + tarifA[1] + '>' + tarifA[0] + ' ' + tarifA[1] + ' руб, дополнительно ' + tarifSuppA[0] + ' ' + tarifSuppA[1] + ' руб</option>';
    }
    calcAvtoTarif.innerHTML = opt;
    getSum();
  }

  function onchangeAvtoTarif() {
    getSum();
  }

  // расчет и вывод итоговой стоимости.
  function getSum() {
    var pos = calcAvtoTypeE[calcAvtoTypeE.selectedIndex].value;
    var calcavtoKmN = calcavtoKmE.value * 1;
    var calcLoaderQuantN = calcLoaderQuantE.value * 1;
    var calcLoaderHourN = calcLoaderHourE.value * 1;

    /****** Формула расчета *****/

       // Тариф
    var costTarif = calcAvtoTarif[calcAvtoTarif.selectedIndex].value * 1;

    // Доплата за километраж
    var costDistance = itemA[pos].avtoCostKm * 2 * calcavtoKmN;
    // где,
    // itemA[pos].avtoCostKm - стоимость за 1 км.
    // calcavtoKmN - Километраж.

    // Стоимость услуг грузчиков
    var costLoaders = calcLoaderQuantN * calcLoaderHourN * loaderCost;
    // где,
    // calcLoaderQuantN - количество грузчиков.
    // calcLoaderHourN - время работы 1-го грузчика.
    // loaderCost - стоимость часа работы 1-го грузчика.

    // итого
    var avtoSumFullN = costTarif + costDistance + costLoaders;

    // вывод данных.
    avtoSumavtoE.innerHTML = costTarif; // Стоимость услуг авто
    avtoSumKmE.innerHTML = costDistance; // Доплата за километраж
    avtoSumLoaderE.innerHTML = costLoaders; // Стоимость услуг грузчиков
    avtoSumFullE.innerHTML = avtoSumFullN; // итого
  } // /getSum()

  // подписка на события.
  calcavtoKmE.onclick = getSum;
  calcavtoKmE.onkeyup = getSum;
  calcLoaderQuantE.onclick = getSum;
  calcLoaderQuantE.onkeyup = getSum;
  calcLoaderHourE.onclick = getSum;
  calcLoaderHourE.onkeyup = getSum;

  calcAvtoTypeE.onchange = onchangeAvtoType;
  calcAvtoTarif.onclick = onchangeAvtoTarif;
  calcAvtoTarif.onkeyup = onchangeAvtoTarif;
  calculateE.onclick = calcRoutee;
  onchangeAvtoType(); // запуск по первому select

  /******************* Google карты *******************/
  var directionsDisplayy;
  var directionsServicee = new google.maps.DirectionsService();
  var geocoder = new google.maps.Geocoder();
  var map;
  // Дождёмся загрузки API и готовности DOM.
  google.maps.event.addDomListener(window, 'load', init);

  function init() {
    directionsDisplayy = new google.maps.DirectionsRenderer();
    var chicagot = new google.maps.LatLng(calcCoordX, calcCoordY);
    var myOptions = {
      zoom: 10, mapTypeId: google.maps.MapTypeId.ROADMAP, center: chicagot
    }
    map = new google.maps.Map(document.getElementById('mapa'), myOptions);
    directionsDisplayy.setMap(map);
    input_initialize(from);
    input_initialize(point_1);
    input_initialize(point_2);
    input_initialize(point_3);
    input_initialize(to);
  } // init()

  function input_initialize(input) {
    var options = {
      types: ['address'],
    };
    var autocomplete = new google.maps.places.Autocomplete(input, options);
    google.maps.event.addListener(autocomplete, 'place_changed', function() {
      var place = autocomplete.getPlace(); //получаем место
      //console.log(place);
      //console.log(place.name);  //название места
      //console.log(place.id);  //уникальный идентификатор места
    });
  } // nput_initialize(input)

  function calcRoutee() {
    // доп. точки
    var pointsA = [];
    var i = 0;
    if(point_1.value != '') {
      pointsA[i] = {location: point_1.value};
      i++;
    }
    if(point_2.value != '') {
      pointsA[i] = {location: point_2.value};
      i++;
    }
    if(point_3.value != '') {
      pointsA[i] = {location: point_3.value};
      i++;
    }

    var request = {
      origin: from.value, destination: to.value, waypoints: pointsA, travelMode: google.maps.TravelMode.DRIVING
    }
    directionsServicee.route(request, function(response, status) {
      if(status == google.maps.DirectionsStatus.OK) {
        directionsDisplayy.setDirections(response);
        var route = response.routes[0];
        var distanceSum = 0;
        var timeSum = 0;

        // удаляет пробельный символ в строках типа 1 000 и 999 999
        function removeSpaces(str) {
          var res = str.replace(/\s/g, '');
          return res;
        }

        for(var i = 0; i < route.legs.length; i++) {
          var routeSegment = i + 1;
          var distanceS = route.legs[i].distance.value; // возвращает расстояние в м
          distanceS = Math.ceil(distanceS / 1000); // перевод в км и округление
          var calcavtoKmE = document.getElementById('calcavtoKmE');
          calcavtoKmE.value = distanceS;
          getSum();
        } // for
      } else {
        alert('Извините, в нашей базе такого города нет... Пожалуйста, свяжитесь с нашим консультантом ');
        console.log(status);
      }
    });
  } // /init()
  /*** Конец Google карты ***/
}// /startCalculator()
document.addEventListener('DOMContentLoaded', startCalculator);