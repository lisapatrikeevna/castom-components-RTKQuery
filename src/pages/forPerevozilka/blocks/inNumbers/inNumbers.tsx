import cl from './inNumbers.module.scss'


const numData = [{
  num: '481 800', text: 'Часов уходит за год на разговоры с клиентами у операторов, это примерно 55 лет непрерывного разговора', class: 'inNumbers__wrep1'
}, {num: '235 км2', text: 'Стретч - пленки было использовано магазином упаковки Компании за 14 лет', class: 'inNumbers__wrep3'}, {num: '5', text: 'Каждый 5 клиент звонит нам по рекомендации', class: 'inNumbers__wrep3'}, {num: '4 600 км', text: 'Самая большая поездка по заказу', class: 'inNumbers__wrep4'},]
const InNumbers = () => {
  return (<div className={cl.inNumbers}>
    <div className={cl.container}>
      <div className={cl.row}>
        {numData.map((numIt, index) => {
          return <div key={index} className={cl.col6}>
            <div className={`${cl.inNumbers__wrep} ${cl[numIt.class]}`}>
              <span className={cl.inNumbers__wrep_nomber}>{numIt.num}</span>
              <p className={cl.inNumbers__wrep_desk}>{numIt.text}</p>
            </div>
          </div>
        })}
      </div>
    </div>
  </div>);
};

export default InNumbers;