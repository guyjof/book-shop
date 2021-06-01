var gTrans = {
    header: {
        en: 'Aviv\'s Book Shop',
        es: 'Libreria de Aviv',
        he: 'חנות הספרים של אביב',
        ch: '阿维夫的书店'
    },
    create: {
        en: 'Create new book',
        es: 'Crear nuevo libro',
        he: 'הוסף ספר חדש',
        ch: '建立新书'
    },
    'id': {
        en: 'ID',
        es: 'Numero serial',
        he: 'מק׳׳ט',
        ch: '身份证号码'
    },
    'title': {
        en: 'Title',
        es: 'Nombre',
        he: 'שם',
        ch: '名称'
    },
    'price': {
        en: 'Price',
        es: 'Precio',
        he: 'מחיר',
        ch: '价格'
    },
    'actions': {
        en: 'Actions',
        es: 'Accion\'s',
        he: 'פעולות',
        ch: '动作'
    },
    'read': {
        en: 'Read',
        es: 'Leer mas',
        he: 'קרא\י עוד',
        ch: '读'
    },
    'update': {
        en: 'Update',
        es: 'Actualizacion',
        he: 'עדכן',
        ch: '更新'
    },
    'delete': {
        en: 'Delete',
        es: 'Borrar',
        he: 'מחק',
        ch: '删除'
    },
    sure: {
        en: 'Language',
        es: 'Idioma',
        he: 'שפה',
        ch: '语'
    },
    'select': {
        en: 'Are you sure?',
        es: 'Estas Seguru?',
        he: 'בטוח נשמה?',
    }
}

var gCurrLang = 'en';
var gCoin = 'USD'


function setLang(lang) {
    gCurrLang = lang;
    var elBody = document.querySelector('body');
    elBody.classList.toggle('rtl')
    if (lang === 'he') {
        if (!elBody.classList.contains('rtl'))
            elBody.classList.toggle('rtl')
        gCoin = 'ILS'
    } else if (lang === 'es') {
        if (elBody.classList.contains('rtl'))
            elBody.classList.toggle('rtl')
        gCoin = 'EUR'
    } else if (lang === 'ch') {
        if (!elBody.classList.contains('rtl'))
            elBody.classList.toggle('rtl')
        gCoin = 'CNY'
    } else {
        if (elBody.classList.contains('rtl'))
            elBody.classList.toggle('rtl')
        gCoin = 'USD'
    }

}
function getTrans(transKey) {
    var keyTrans = gTrans[transKey]
    if (!keyTrans) return 'UNKNOWN'
    var txt = keyTrans[gCurrLang];
    if (!txt) return keyTrans.en
    return txt
}

function doTrans() {
    var els = document.querySelectorAll('[data-trans]')
    els.forEach(function (el) {
        var txt = getTrans(el.dataset.trans)
        if (el.nodeName === 'INPUT') el.placeholder = txt;
        else el.innerText = txt
    })
}


function formatNum(num) {
    return new Intl.NumberFormat(gCurrLang).format(num);
}

function formatCurrency(num) {
    return new Intl.NumberFormat(gCurrLang, { style: 'currency', currency: gCoin }).format(num);
}

function ilsToX(price, lang) {
    var ils = price;
    if (lang === 'en') {
        ils /= 3.24;
    } else if (lang === 'es') {
        ils /= 3.97;
    } else if (lang === 'ch') {
        ils *= 2;
    } else return ils;
    return ils
}

