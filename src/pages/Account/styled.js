import styled from 'styled-components';

export const PageArea = styled.div`

    &{
        display: flex;
        margin-top: 20px;        
    }

    .leftSide,
    .rightSide{
        border-radius: 5px;
        border: 1px solid #DDD;
        box-shadow: 0px 0px 3px #CCC;
    }

    .leftSide{
        width: 250px;
        margin: 0 20px 0 0;
        background-color: #FFF;

        ul{
            width: 100%;
            display: flex;
            flex-direction: column;
            padding: 0;
            margin: 0;
            align-items: center;
            justify-content: center;
        }

        ul, li{
            list-style: none;
        }

        li{
            width: 100%;
            padding: 10px 0;
            text-align: center;
            cursor: pointer;
            border-radius: 5px;

            &:hover{
                background-color: #FF8100;
                color: #FFF;
            }
        }

        .active{
            background-color: #7900DF;
            color: #FFF;
        }

    }

    .rightSide{
        flex: 1;
        background-color: #FFF;
        padding: 10px;

        .dataData{
            display: flex;
            flex-direction: column;

            .nameUF{
                display: flex;
                margin: 10px 0;
                font-size: 14px;

                .dataName{
                    flex: 1;
                }

                .dataUF{
                    width: 150px;
                }
            }

            .dataEmail{
                margin: 10px 0;
                font-size: 14px;
            }
        }

        .my-ads{
            width: 100%;
            text-align: center;
            border: none;
            padding: 0;

            caption{
                font-size: 17px;
                font-weight: bold;
                margin-bottom: 10px;
            }

            thead{
                
                th{
                    background-color: #6E0AD6;
                    color: #FFF;
                    padding: 5px 0;
                }

            }

            tbody{

                tr{
                    &:hover{
                        background-color: #8CE563;

                        td{
                            color: #FFF;
                        }
                        
                    }                    
                    
                }

                td{
                    height: 40px;
                    font-size: 14px;
                    color: #000;

                    a, 
                    button{
                        color: #FFF;
                        text-decoration: none;
                        padding: 5px 10px;
                        border-radius: 5px;
                        border: 0;
                        outline: 0;
                        cursor: pointer;
                    }

                    a{
                        background-color: #F78323;

                        &:hover{
                            background-color: #FFF;
                            color: #F78323;
                        }
                    }

                    button{
                        background-color: rgb(58,89,152);
                        padding: 8px 10px 6px 10px;
                        margin-left: 10px;

                        &:hover{
                            background-color: #4285F4;
                        }
                    }

                    img{
                        width: 40px;
                        height: 40px;
                        border: 0;
                        background-size: cover;
                    }

                }

                .neg{
                    background-color: #EEE;
                    font-weight: bold;
                }
            }

        }

        .alertWarning{
            width: 100%;
            background-color: #FFF3CD;
            color: #A18532;
            text-align: center;
            padding: 10px;
        }

        .editData{

        }
    }

    @media (max-width: 600px){

        flex-direction: column;

        .leftSide{
            margin:0;
            width: auto;
        }

        .rightSide{

            .my-ads{

                th, td{
                    font-size: 12px;
                }

                tbody{

                    tr{
                        padding: 2px 0;

                        td{
                            font-size: 11px;
                            border-bottom: 1px solid #EEE;

                            button, 
                            a{
                                margin: 0;
                                padding: 0;
                                display:block;
                                padding: 2px 4px;
                                width: 100%;
                            }

                            button{
                                margin-top: 2px;
                            }
                        }

                    }

                    

                }

            }

        }

    }

`;

export const ModalArea = styled.div`

    width: auto;
    
    h3{
        color: rgb(247,131,34);
        text-align: center;

        .fechar{
            background-color: #DC3546;
            color: #FFF;
            float: right;
            font-size: 14px;
            padding: 5px 10px;
            cursor: pointer;
        }
    }

    hr{
        background-color: rgb(247,131,34);
    }

    

`;

export const FormInput = styled.div`
    form{
        background-color: #FFF;
        border-radius: 3px;
        padding: 10px;
        box-shadow: 0px 0px 3px #999;

        .area{
            display: flex;
            align-items:center;
            padding: 10px;
            max-width: 500px;

            .area--title{
                width: 200px;
                text-align: right;
                padding-right: 20px;
                font-weight: bold;
                font-size: 14px;
            }

            .area--input{
                flex: 1;

                input[type=email],
                input[type=password],
                input[type=text],
                select,
                textarea{
                    width: 100%;
                    font-size: 14px;
                    padding: 5px;
                    border: 1px solid #DDD;
                    border-radius: 3px;
                    outline: 0;
                    transition: all ease .4s;

                    &:focus{
                        border: 1px solid #333;
                        color: #333;
                    }
                }

                textarea{
                    height: 150px;
                    resize: none;
                }

                button{
                    background-color: #0089FF;
                    border: 0;
                    outline: 0;
                    padding: 5px 10px;
                    border-radius: 4px;
                    color: #FFF;
                    font-size: 15px;
                    cursor: pointer;

                    &:hover{
                        background-color: #006FCE;
                    }
                }
            }

        }
    }

    @media (max-width: 600px){

        form{
            .area{
                flex-direction: column;

                .area--title{
                    width: 100%;
                    text-align: left;
                    margin-bottom: 10px;
                }

                .area--input{
                    width: 100%;

                    button{
                        width: 100%;
                        padding: 10px;
                    }
                    textarea{
                        height: 100px;
                    }
                }

                
            }
        }

        }
`;
