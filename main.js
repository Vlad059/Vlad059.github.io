ymaps.ready(init);

function init() {
    let myMap = new ymaps.Map("map", {
        center: [57.98, 56.23],
        zoom: 12,
        controls: ['geolocationControl', 'typeSelector', 'zoomControl']
    });

    // let blueCollection = new ymaps.GeoObjectCollection(null, {
    //     preset: 'islands#blueFuelStationIcon'
    // });

    //Координаты заправок
    let blueCoords = [[57.989452, 56.232477], [57.997861, 56.225455]];

    let indexRoute = -1;

    //Макет балуна
    function createBalloonLayout(coords, myMap) {

        let ballContentLayout = ymaps.templateLayoutFactory.createClass(
            `
            <style>
                .station-layout {
                    display:flex;
                    justify-content: center;
                    min-height: 45px;
                }
            </style>
            <div class="station-layout">
                <button id="my-but" mydata={{properties.data.mes}} class="one">
                    Маршрут {{ properties.name }}{{ properties.data.mes }}
                </button>
            </div>`, {

            // Переопределяем функцию build, чтобы при создании макета начинать
            // слушать событие click на кнопке-счетчике.
            build: function () {
                // Сначала вызываем метод build родительского класса.
                ballContentLayout.superclass.build.call(this);
                // А затем выполняем дополнительные действия.
                let myBut = document.getElementById('my-but');
                myBut.onclick = this.onClick;
            },

            // Аналогично переопределяем функцию clear, чтобы снять
            // прослушивание клика при удалении макета с карты.
            clear: function () {
                // Выполняем действия в обратном порядке - сначала снимаем слушателя,
                // а потом вызываем метод clear родительского класса.
                let myBut = document.getElementById('my-but');
                myBut.onclick = null;
                ballContentLayout.superclass.clear.call(this);
            },

            onClick: function () {
                
                navigator.geolocation.getCurrentPosition(makeRoute, (err)=>alert(err.message));

                function makeRoute(position) {
                    let userCoords = [position.coords.latitude, position.coords.longitude];

                    ymaps.route([userCoords, coords])
                    .then(function (route){
                        //Установка значка для пользователя
                        route.getWayPoints().get(0).options.set('preset', 'islands#geolocationIcon');

                        //Удаление метки заправки, т.к. она уже существует 
                        route.getWayPoints().remove(route.getWayPoints().get(1));

                        myMap.geoObjects.add(route);

                        //Удаление предыдущего маршрута
                        if (indexRoute>=0) myMap.geoObjects.remove(myMap.geoObjects.get(indexRoute));

                        //Индекс предыдущего маршрута для удаления при создании нового маршрута
                        indexRoute = myMap.geoObjects.indexOf(route);
                        //Можно узнать длину пути
                        //alert(route.getLength());
                    });
                }
            }
        });

        return ballContentLayout;
    }

    let myCluster = new ymaps.Clusterer();

    for (let i = 0, l = blueCoords.length; i < l; i++) {
        let BalloonContentLayout = createBalloonLayout(blueCoords[i], myMap);
        myCluster.add(new ymaps.Placemark(blueCoords[i], { name: i, data: {
            mes: "Hi"
        } }, {
            balloonContentLayout: BalloonContentLayout,
            preset: 'islands#blueFuelStationIcon'
        }));
    }

    myMap.geoObjects.add(myCluster);

}

async function getInternet(){
    try {
        let x = await fetch("https://www.google.com/");
        console.log(x);
    } catch {
        alert("Нет интернета");  
    } finally {
        setTimeout(getInternet, 5000);
    }    
}

getInternet();