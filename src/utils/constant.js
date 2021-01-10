const RANDOM_LENGTH = 6;

const RANDOM_MAX = 10;

const PER_PAGE = 10;

const STATUS_BOARD = [
    {
        title : '대여 예정',
        state : 0,
        buttonName : '대여 확인',
    },
    {
        title : '반납 예정',
        state : 1,
        buttonName : '반납 확인',
    },
    {
        title : '연체 내역',
        state : 2,
        buttonName : '연체 확인',
    },
] 

const reservationLists = [
    {
        title : "대여 예정",
        reservations : [
            {
                id : 1,
                userName : 'dong',
                fromDate : '2020-01-09',
                toDate : '2020-01-10',
            }
        ]
    },
    {
        title : "반납 예정",
        reservations : [
            {
                id : 1,
                userName : 'dong',
                fromDate : '2020-01-09',
                toDate : '2020-01-10',
            }
        ]
    }
]

module.exports = { RANDOM_LENGTH, RANDOM_MAX, STATUS_BOARD, PER_PAGE }