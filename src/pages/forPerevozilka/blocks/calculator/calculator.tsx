import { useEffect, useState } from 'react';
import './calculator.css';
import cabluk from './assets/cabluk_01.jpg';
import gazelTent from './assets/gazel_tent.jpg';
import bychok from './assets/bychok.jpg';
import gaz from './assets/gaz56.jpg';
import fura from './assets/kamaz.jpg';
import kamazfura from './assets/kamazfura.jpg';
// import photo_2020 from './assets/ph';


const loaderCost = 300;
const calcCoordX = 55.7522200;
const calcCoordY = 37.6155600;
const imgPath = 'assets';
const itemA = [
  {
  'avtoName': 'Каблук (0,5 тонны, 2,5 куб. м)', // название авто.
  'tarif': ['30мин=800|30мин=900', '1час=1000|1час=800', '2часа=1300|1час=700', '3часа=1800|1час=600', '4часа=2100|1час=500'], // стоимость авто, где ["время=тариф|дополнительное время=цена"].
  'avtoCostKm': 50, // стоимость 1 км пробега, в руб.
  'avtoPic': cabluk,//'cabluk_01.jpg', // фото авто из папки calculator/pic/.
  'avtoDesc': 'Эти небольшие автомобили чрезвычайно надежны в эксплуатации. Небольшой расход топлива и общая небольшая стоимость автоперевозок на «каблуке» (средняя цена сравнима со стоимостью услуг пассажирского такси) относятся к его экономическим преимуществам.' // дополнительная информация.
}, {
  'avtoName': 'Газель-тент (1,5 тонны, 9 куб. м)', // название авто.
  'tarif': ['30мин=990|30мин=900', '1час=1390|1час=800', '2часа=1690|1час=700', '3часа=2190|1час=600', '4часа=2490|1час=500'], // стоимость авто, где ["время=тариф|дополнительное время=цена"].
  'avtoCostKm': 50, // стоимость 1 км пробега, в руб.
  'avtoPic': gazelTent,//'gazel_tent.jpg', // фото авто из папки calculator/pic/.
  'avtoDesc': 'Тентованная газель имеет длину кузова 3 метра и высоту тента 1м 60 см., грузоподьемность газель тент 1,5 тонны, тентованные газели оборудованные для перевозки мебели, имеются ремни, прокладочный материал.' // дополнительная информация.
}, {
  'avtoName': 'Бычок (3 тонны, 30 куб. м)', // название авто.
  'tarif': ['30мин=990|30мин=900', '1час=990|1час=900', '2часа=990|1час=900', '3часа=990|1час=900', '4часа=990|1час=900', '5часов=990|1час=900'], // стоимость авто, где ["время=тариф|дополнительное время=цена"].
  'avtoHourMin': 1, // минимальное время заказа авто, в часах.
  'avtoCostKm': 50, // стоимость 1 км пробега, в руб.
  'avtoPic': bychok,//'bychok.jpg', // фото авто из папки calculator/pic/.
  'avtoDesc': 'Грузоподьемность машины до 3 тонн. Бортовой Бычок длина от 4, 5, 6 метров 18 кубов. Закрытый Бычок до 30 кубов. Открытый бычок занимаемся перевозкой станков, стройматериалов, строительных грузов, досок, бревен и т.п.' // дополнительная информация.
}, {
  'avtoName': 'ГАЗ (5 тонн, 25 куб. м)', // название авто.
  'tarif': ['30мин=990|30мин=900', '1час=990|1час=900', '2часа=990|1час=900', '3часа=990|1час=900', '4часа=990|1час=900', '5часов=990|1час=900'], // стоимость авто, где ["время=тариф|дополнительное время=цена"].
  'avtoCostKm': 50, // стоимость 1 км пробега, в руб.
  'avtoPic': gaz,//'gaz56.jpg', // фото авто из папки calculator/pic/.
  'avtoDesc': 'Газ Бортовой 5 тонн. Открытый Газ, машина длина которого составляет 6 метров, нарощенные борта, есть брезент, ремни крепления груза, полы кузова деревянные что позволяет перевозить катушки с кабеля.' // дополнительная информация.
}, {
  'avtoName': 'Камаз (10 тонн, 36 куб. м)', // название авто.
  'tarif': ['30мин=990|30мин=900', '1час=990|1час=900', '2часа=990|1час=900', '3часа=990|1час=900', '4часа=990|1час=900', '5часов=990|1час=900'], // стоимость авто, где ["время=тариф|дополнительное время=цена"].
  'avtoCostKm': 50, // стоимость 1 км пробега, в руб.
  'avtoPic': fura,//'kamaz.jpg', // фото авто из папки calculator/pic/.
  'avtoDesc': 'Камаз бортовой от 6 м, 9 м, 12 м, 13, 5 м. Бортовая машина для грузоперевозки тяжелых габаритных грузов. Камаз перевозит разные грузы плиты, трубы, бытовки, доски, железо, конструкции и т.д.' // дополнительная информация.
}, {
  'avtoName': 'Фура (20 тонн, 80 куб. м)', // название авто.
  'tarif': ['30мин=990|30мин=900', '1час=990|1час=900', '2часа=990|1час=900', '3часа=990|1час=900', '4часа=990|1час=900', '5часов=990|1час=900'], // стоимость авто, где ["время=тариф|дополнительное время=цена"].
  'avtoCostKm': 50, // стоимость 1 км пробега, в руб.
  'avtoPic': kamazfura,//'kamazfura.jpg', // фото авто из папки calculator/pic/.
  'avtoDesc': 'Камаз еврофура, длина составляет 12,13,5 метров, от 60 до 120 кубов, грузоподьемность до 20 тонн, рагрузка верхняя и боковая' // дополнительная информация.
} // здесь запятая не ставится, т.к. это последний элемент.
];


const Calculator = () => {
  const [calcavtoKmE, setCalcavtoKmE] = useState<number>(0)
  const [calcLoaderQuantE, setCalcLoaderQuantE] = useState<number>(0)
  const [calcLoaderHourE, setCalcLoaderHourE] = useState<number>(0)
  const [calcAvtoTypeE, setCalcAvtoTypeE] = useState(null)
  const [calcAvtoTarif, setCalcAvtoTarif] = useState(0)
  const [calcShowavtoPicE, setCalcShowavtoPicE] = useState(null)
  const [avtoDescE, setAvtoDescE] = useState(0)
  const [fromC, setFromC] = useState('')
  const [to, setTo] = useState('')
  const [point_1, setPoint_1] = useState('')
  const [point_2, setPoint_2] = useState('')
  const [point_3, setPoint_3] = useState('')
  const [showAddPoint, setShowAddPoint] = useState('none')
  const [avtoSumavtoE, setAvtoSumavtoE] = useState(0)

  const [avtoSumKmE, setAvtoSumKmE] = useState(0);
  const [avtoSumLoaderE, setAvtoSumLoaderE] = useState(0);
  const [avtoSumFullE, setAvtoSumFullE] = useState(0);

  const [mapLoaded, setMapLoaded] = useState(false);
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp&amp;libraries=places&amp;key=AIzaSyBiWHNYtw9Wbv0RdBz31CdEtIqLIobJXtU';
    script.async = true;
    script.defer = true;
    // script.onload = init;
    script.onload = () => setMapLoaded(true); // Устанавливаем флаг, когда скрипт загружен
    document.body.appendChild(script);
    setCalcAvtoTypeE(itemA[0])

    return () => {
      document.body.removeChild(script);
    };
  }, []);
  if( !mapLoaded ) {
    return <div>Loading...</div>; // Возвращаем заглушку, пока скрипт загружается
  }
  /******************* Google карты *******************/
  var directionsDisplayy;
  var directionsServicee = new google.maps.DirectionsService();
  var geocoder = new google.maps.Geocoder();
  var map;
  // Дождёмся загрузки API и готовности DOM.
  google.maps.event.addDomListener(window, 'load', init);

  function init() {
    directionsDisplayy = new google.maps.DirectionsRenderer();
    let chicagot = new google.maps.LatLng(calcCoordX, calcCoordY);
    let myOptions = {
      zoom: 10, mapTypeId: google.maps.MapTypeId.ROADMAP, center: chicagot
    }
    map = new google.maps.Map(document.getElementById('mapa'), myOptions);
    directionsDisplayy.setMap(map);
    input_initialize(fromC);
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

  const getSum = () => {
    // debugger
    const pos = calcAvtoTypeE;
    const calcavtoKmN = calcavtoKmE;
    // const calcavtoKmN = parseInt(calcavtoKmE);
    const calcLoaderQuantN = calcLoaderQuantE;
    // const calcLoaderQuantN = parseInt(calcLoaderQuantE);
    const calcLoaderHourN = calcLoaderHourE;
    // const calcLoaderHourN = parseInt(calcLoaderHourE);

    const costTarif = parseInt(calcAvtoTarif.current.value);
    const costDistance = itemA[pos].avtoCostKm * 2 * calcavtoKmN;
    const costLoaders = calcLoaderQuantN * calcLoaderHourN * loaderCost;
    const avtoSumFullN = costTarif + costDistance + costLoaders;

    setAvtoSumavtoE(costTarif);
    setAvtoSumKmE(costDistance);
    setAvtoSumLoaderE(costLoaders);
    setAvtoSumFullE(avtoSumFullN);
  };
  const handleAvtoTypeChange = (index:number) => {
    debugger
    setCalcAvtoTypeE(itemA[index])
    setCalcShowavtoPicE(calcAvtoTypeE.avtoPic)
    setAvtoDescE(calcAvtoTypeE.avtoDesc)
    // setCalcAvtoTarif(calcAvtoTypeE.tarif)
    // let options = '';
    // for( let j = 0; j < itemA[pos]['tarif'].length; j++ ) {
    //   const arr = itemA[index]['tarif'][j].split('|');
    //   const tarifA = arr[0].split('=');
    //   const tarifSuppA = arr[1].split('=');
    //   options += `<option value=${tarifA[1]}>${tarifA[0]} ${tarifA[1]} руб, дополнительно ${tarifSuppA[0]} ${tarifSuppA[1]} руб</option>`;
    // }
    // calcAvtoTarif.current.innerHTML = options;
    getSum();
  };
  const handleAvtoTarifChange = (e) => {
    console.log(e.target.value);
    setCalcAvtoTarif(e.target.value)
    // getSum();
  };

  function calcRoutee() {
    // доп. точки
    var pointsA = [];
    var i = 0;
    if( point_1 != '' ) {
      pointsA[i] = {location: point_1};
      i++;
    }
    if( point_2 != '' ) {
      pointsA[i] = {location: point_2};
      i++;
    }
    if( point_3 != '' ) {
      pointsA[i] = {location: point_3};
      i++;
    }

    var request = {
      origin: fromC, destination: to, waypoints: pointsA, travelMode: google.maps.TravelMode.DRIVING
    }
    directionsServicee.route(request, function(response, status) {
      if( status == google.maps.DirectionsStatus.OK ) {
        directionsDisplayy.setDirections(response);
        let route = response.routes[0];
        const distanceSum = 0;
        const timeSum = 0;

        // удаляет пробельный символ в строках типа 1 000 и 999 999
        function removeSpaces(str) {
          const res = str.replace(/\s/g, '');
          return res;
        }

        for( let i = 0; i < route.legs.length; i++ ) {
          const routeSegment = i + 1;
          let distanceS = route.legs[i].distance.value; // возвращает расстояние в м
          distanceS = Math.ceil(distanceS / 1000); // перевод в км и округление
          const calcavtoKmE = document.getElementById('calcavtoKmE');
          calcavtoKmE.value = distanceS;
          getSum();
        } // for
      } else {
        alert('Извините, в нашей базе такого города нет... Пожалуйста, свяжитесь с нашим консультантом ');
        console.log(status);
      }
    });
  } // /init()
  const fromHandler = (e) => {
    setFromC(e.currentTarget.value)
  }
  const point1Handler = (e) => {
    setPoint_1(e.currentTarget.value)
  }
  const point2Handler = (e) => {
    setPoint_2(e.currentTarget.value)
  }
  const point3Handler = (e) => {
    setPoint_3(e.currentTarget.value)
  }
  const toHandler = (e) => {
    setTo(e.currentTarget.value)
  }
  const calcavtoKmEHandler = (e) => {
    // debugger
    setCalcavtoKmE(+e.currentTarget.value)
    getSum()
  }
  const calcLoaderQuantEHandler = (e) => {
    setCalcLoaderQuantE(+(e.currentTarget.value))
    getSum()
  }
  const calcLoaderHourEHandler = (e) => {
    setCalcLoaderHourE(+(e.currentTarget.value))
    getSum()
  }


  return (<div className="wr-calculator container">
    <div className="calcTitle">Рассчитайте <span>стоимость перевозки</span></div>
    <br/>
    <div className="row">
      <div className="col-xs-12">
        <div className="col-sm-6 col-xs-12 calcLeftBlock">

          <div className="calcTitle">
            {/*<div className="calcSelBlock">*/}
            <b>Точка отправления *</b>
            <br/>
            <input value={fromC} type="text" maxLength="60" className="calc_input" required="required" onChange={fromHandler}/>
            <button className="showAddPoint" onClick={() => setShowAddPoint('inline-block')}>Добавить дополнительные точки останова:</button>

            <div className="calcAddPoint"
              // value={calcAddPoint}
	  style={{display: showAddPoint}}>
              <div className="calcSelBlock">
	 <input value={point_1} type="text" className="calc_input" id="point_1" onChange={point1Handler}/>
              </div>
              <div className="calcSelBlock">
	 <input value={point_2} type="text" className="calc_input" id="point_2" onChange={point2Handler}/>
              </div>
              <div className="calcSelBlock">
	 <input value={point_3} type="text" className="calc_input" id="point_3" onChange={point3Handler}/>
              </div>
            </div>

          </div>

          <div className="calcSelBlock">
            <b>Точка назначения *</b>
            <br/>
            <input value={to} type="text" maxLength="60" size="40" className="calc_input" required="required" onChange={toHandler}/>
            <p className="desk">* обязательные поля</p>
          </div>

          <br/>
          <button id="calculateBtn" className="calculateBtn btn btn-w" type="submit" onClick={calcRoutee}>
            {/*<img src="catalog/view/javascript/pic/photo_2020-08-03_23-06-48.jpg" alt="Построить маршрут"/>*/}
            Построить маршрут
          </button>
          <a className="btn btn-w" data-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
            показать карту
          </a>
          <br/><br/>
        </div>
        {/* className="calcLeftBlock"  */}
        <div className="col-sm-6 col-xs-12 calcRightBlock calcavtoPic">

          <div className="car">
            <legend className="calcItemName"><b>Выбрать автомобиль:</b></legend>
            <select id="calcAvtoTypeE" value={calcAvtoTypeE ? calcAvtoTypeE.avtoName : itemA[0]} onChange={(e) => handleAvtoTypeChange(e.target.value)}>
              {/*<select id="calcAvtoTypeE" value={calcAvtoTypeE.avtoName} onChange={(e) => handleAvtoTypeChange(e.target.value)}>*/}
              {itemA.map((auto, index) => {
	 return <option key={index} value={index}>{auto.avtoName}</option>
              })}
            </select>
          </div>

          <fieldset>
            {/* <div className="col-md-6"> */}
            {calcShowavtoPicE ? <img src={calcShowavtoPicE}/> : null}
            <br/><br/>
            {/* </div> */}
            <div className="col-md-6">
              <span className="avtoDescE" id="avtoDescE">{avtoDescE}</span>
            </div>
          </fieldset>

          <hr/>
          {/* <!-- </div> --></div> className="calcRightBlock" --> */}
          <div className="col-xs-12 map-wrepp">
            <div className="collapse" id="collapseExample">
              <div className="card card-body">
	 <div id="maps">
	   <div id="mapa"> Google карта</div>
	 </div>
	 <div style={{clear: 'both'}}></div>
	 <br/>
              </div>
            </div>
          </div>

        </div>
        <br/><br/>

        <div id="calcContent" className="col-xs-12 calcContent">
          {/* <!-- <legend><b>Выбрать автомобиль:</b></legend>	Тип автомобиля --> */}
          <div className="row findAuto">
            <div className="col-md-6 col-xs-12 calcinfoBlock calcinfoBlock1">

              <div className="">
	 <legend className="calcItemName">Тариф:</legend>
	 <select className="calcAvtoTarif" size="1" value={calcAvtoTypeE.tarif[0]} onChange={handleAvtoTarifChange} onKeyUp={handleAvtoTarifChange}>
                  {calcAvtoTypeE.tarif.map((t)=>{
                    const parts = t.split('|');
                   return <option value={t}>
                      {parts[0].replace('=', ' ')} руб, дополнительно {parts[1].replace('=', ' ')} руб
                    </option>
                  })}
	 </select>
              </div>

              <fieldset>
	 <legend><b>Расстояние</b></legend>
	 <span className="calcItemName">Километраж:</span>
	 <input type="number" min="0" max="5000" value={calcavtoKmE} onChange={calcavtoKmEHandler} onKeyUp={calcavtoKmEHandler} step="1" style={{width:"70px"}} /> км.
	 <br/>
	 <p className="desk">(рассчитывается по карте, либо вводится вручную)</p>
              </fieldset>

              <fieldset>
	 <legend><b>Услуги грузчиков</b></legend>
	 <div className="srike">
	   <span className="calcItemName">Количество грузчиков:</span>
	   <input type="number" size="2" min="0" max="24" value={calcLoaderQuantE} onChange={calcLoaderQuantEHandler} onKeyUp={calcLoaderQuantEHandler} style={{width:"70px"}} /> чел.
	   <p id="calcLoaderSrikeE">
                    {/*<span><i className="fas fa-male"></i></span> */}
	   </p>
	 </div>
	 <br/>
	 <span className="calcItemName">Время работы грузчиков:</span>
	 <input type="number" style={{width:"70px"}} size="3" min="0" max="24" value={calcLoaderHourE} onKeyUp={calcLoaderHourEHandler} onChange={calcLoaderHourEHandler}/> в часах
	 <br/><br/>
	 <p className="desk">Цены на услуги такелажников по переноске тяжелых и габаритных грузов (сейфы, пианино, аквариумы) просьба уточнять у оператора!</p>
              </fieldset>

            </div>
               <div className="col-md-6 col-xs-12 calcinfoBlock calcinfoBlock2">

                 <fieldset>
            <legend><b>Расчет стоимости</b></legend>
            Стоимость услуг авто: <span id="avtoSumavtoE">{avtoSumavtoE? avtoSumavtoE: 0}</span> руб.
            <br/>Доплата за километраж: <span id="avtoSumKmE">{avtoSumKmE? avtoSumKmE: 0 }</span> руб.
            <br/>Стоимость услуг грузчиков: <span id="avtoSumLoaderE">{avtoSumLoaderE? avtoSumLoaderE :0}</span> руб.
            <br/><br/><b className="blue">Итого: <span id="avtoSumFullE">{avtoSumFullE? avtoSumFullE: 0}</span> руб.</b>
                 </fieldset>

               </div>
          </div>
          {/* <!-- calcContent --> */}
        </div>

        {/* <div style="clear:both;"></div> */}
      </div>
      {/* id="calculatorE"  */}
    </div>
  </div>);
};

export default Calculator;