$(document).ready(function(){

    let cron;
    let ss = 0;
    let mm = 0;
    let tempo = 1000;

    function timer_timer() {
        ss++;
        
        if (ss == 60) {
            ss = 0;
            mm++;
        }

        let format = (mm < 10 ? '0' + mm : mm) + " : " + (ss < 10 ? '0' + ss : ss);
        document.getElementById('counter').innerText = format;
    }

    function pause_timer() {
        clearInterval(cron);
        cron = null; // Limpe a variável cron para que start() possa ser chamado novamente corretamente
    }

    function stop_timer() {
        clearInterval(cron);
        mm = 0;
        ss = 0;
        cron = null; // Limpe a variável cron
        document.getElementById('counter').innerText = "0 : 00";
    }

    function start_timer() {
        document.getElementById('counter').innerText = "0 : 00";
        setTimeout(function() {
            if (!cron) {
                cron = setInterval(() => { timer_timer() }, tempo);
            }
        }, 1000);
    }

    function SistemaCartas() {

        const ArrayCartas = [
            { back: 'furyface_1', front: 'front_furyface_1', emoji: '😡'},
            { back: 'furyface_2', front: 'front_furyface_2', emoji: '😡'},

            { back: 'happyface_1', front: 'front_happyface_1', emoji: '🙂'},
            { back: 'happyface_2', front: 'front_happyface_2', emoji: '🙂'},

            { back: 'heartface_1', front: 'front_heartface_1', emoji: '😍'},
            { back: 'heartface_2', front: 'front_heartface_2', emoji: '😍'},

            { back: 'deliciousface_1', front: 'front_deliciousface_1', emoji: '😋'},
            { back: 'deliciousface_2', front: 'front_deliciousface_2', emoji: '😋'},

            { back: 'genioface_1', front: 'front_genioface_1', emoji: '🤓'},
            { back: 'genioface_2', front: 'front_genioface_2', emoji: '🤓'},

            { back: 'sunglassesface_1', front: 'front_sunglassesface_1', emoji: '😎'},
            { back: 'sunglassesface_2', front: 'front_sunglassesface_2', emoji: '😎'},

            { back: 'iceface_1', front: 'front_iceface_1', emoji: '🥶'},
            { back: 'iceface_2', front: 'front_iceface_2', emoji: '🥶'},

            { back: 'seriousface_1', front: 'front_seriousface_1', emoji: '😑'},
            { back: 'seriousface_2', front: 'front_seriousface_2', emoji: '😑'},

            { back: 'notalkface_1', front: 'front_notalkface_1', emoji: '😶'},
            { back: 'notalkface_2', front: 'front_notalkface_2', emoji: '😶'},

            { back: 'partyface_1', front: 'front_partyface_1', emoji: '🥳'},
            { back: 'partyface_2', front: 'front_partyface_2', emoji: '🥳'},
        ];

        const cartasReorganizadas = ArrayCartas.map(card => ({
            id: card.back,
            front: card.front,
    }));

    // Função para embaralhar o array
    function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
    }

    // Embaralha o array de IDs
    const cartasEmbaralhadas = shuffleArray(ArrayCartas);
    console.log('IDs embaralhados:', cartasEmbaralhadas);

    const backs = document.querySelectorAll('.back');
    const fronts = document.querySelectorAll('.front');

    if (backs.length === cartasEmbaralhadas.length && fronts.length === cartasEmbaralhadas.length) {
        for (let i = 0; i < cartasEmbaralhadas.length; i++) {
            backs[i].id = cartasEmbaralhadas[i].back;
            fronts[i].id = cartasEmbaralhadas[i].front;

            document.getElementById(fronts[i].id).innerText = cartasEmbaralhadas[i].emoji; 
            console.log('Back ID:', backs[i].id);
            console.log('Front ID:', fronts[i].id);
        }
    } else {
    console.error('O número de elementos "back" ou "front" não corresponde ao tamanho do array de cartas embaralhadas.');
    }
    $(".front").hide();
}

    
    // Quando apertar na tela, ele será escondido e aparecera a tela de jogo
    $(".main").click(function(){
        $(".main").hide();
        $(".container").css("display", "flex");
        SistemaCartas();
        start_timer();

    });




    // Definindo variaveis 

    let click = 0;
    let array = [];
    let arrayid = [];
    let acertos = 0;
    let erros = 0;
    document.getElementById("erros").innerText = erros;
    // Quando o div com a class ".back" ele vai sumir, e seu "irmão", ira receber um display: flex
    $(".back").click(function(){

        $(this).hide();
        $(this).siblings(".front").css("display", "flex");
        // A cada carta clicada, ira aumentar a quantidade dentro da variavel acertos

        click += 1;
        
        // assim o o seu id será colocado dentro de uma variavel "id", será retirado uma parte dele, desde o "_" para frente, e será colocado     
        // dentro de um array, mas a variavel "id", tambem será colocado em outro array            
        let id = this.id;
        let idDoPar = id.split('_')[0];
        array.push(idDoPar);
        arrayid.push(id);
        // Quando tiver clidado em 2 cartas, ele vai setar 4 variaveis para os dois arrays, pegar suas informações
        if (click == 2) {

            $(".back").addClass("blocked");
            let primeiroid = array[0];
            let segundoid = array[1];

            let primeiroid1 = arrayid[0];
            let segundoid1 = arrayid[1];
            // Assim o array será esvaziado e o numero de click será zero, para que mais cartas possam ser clicadas
            array = [];
            arrayid = [];
            click = 0;

            // Se o primeiro id n for igual ao segundo id
            if (primeiroid != segundoid) {
                erros += 1;
                $("#erros").text(erros);
                // Será esperado um tempo, logo quando esse tempo acabar, ele escondera a frente das cartas, e aparecerá o atras das duas cartas
                setTimeout(function() {
                    $("#" + primeiroid1).css("display", "flex");
                    $("#" + segundoid1).css("display", "flex");
                    $("#front_" + primeiroid + "_1").hide();
                    $("#front_" + segundoid + "_1").hide();
                    $("#front_" + primeiroid + "_2").hide();
                    $("#front_" + segundoid + "_2").hide();
                }, 500);
                
                $(".back").removeClass("blocked");
                console.log ("Diferentes" + primeiroid + segundoid);
            } else {
                acertos += 1;
                console.log('Os dois IDs são iguais.');
                
                setTimeout(function() {
                    document.getElementById(`front_${primeiroid}_1`).classList.add('acertou');
                    document.getElementById(`front_${primeiroid}_2`).classList.add('acertou');
                    $(".back").removeClass("blocked");
                }, 500);
                // Se os acertos forem igual a 10...
                if (acertos == 10) 
                {
                pause_timer()
                    $(".back").addClass("blocked");

                    setTimeout(function() {

                        $(".win").css("display", "flex");
                        document.getElementById("title").innerText = "YOU WIN";

                    }, 1000);
                }   
            }
        }  
    });

    $("#restart").click(function(){
        acertos = 0;
        $(".win").hide();
        $(".front").hide();
        $(".back").css("display", "flex");

        $(".front").removeClass("acertou");
        stop_timer()
        setTimeout(() => {
            $(".back").removeClass("blocked");
            start_timer()
            SistemaCartas();
            erros = 0;
            document.getElementById("erros").innerHTML = erros;
        }, 500);
        
       
       
    });


});