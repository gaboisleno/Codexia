

function numero(x){
    switch(x){
        case 1:
        return 'uno';
        break;
        
        case 2:
        return 'dos';
        break;

        case 3:
        return 'tres';
        break;

        case 4:
        return 'cuatro';
        break;

        case 5:
        return 'cinco';
        break;

        case 6:
        return 'seis';
        break;

        case 7:
        return 'siete';
        break;

        case 8:
        return 'ocho';
        break;

        case 9:
        return 'nueve';
        break;

        default:
            switch (x){
                case (x>9 && x<20):
                return ('diez'+' '+(numero(x-10)));
                break;
                
                case (x>19 && x<30):
                return ('veinte'+' '+(numero(x-20)));
                break;
            }
        break;
    }
}



console.log(numero(13));
