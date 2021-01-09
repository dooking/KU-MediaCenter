const RANDOM_LENGTH = 6;

const RANDOM_MAX = 10;

const STATUS_BOARD = [
    {
        title : '대여 예정',
        state : 0
    },
    {
        title : '반납 예정',
        state : 1
    },
    {
        title : '연체 내역',
        state : 2
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

module.exports = { RANDOM_LENGTH, RANDOM_MAX, STATUS_BOARD }