import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import MaskedInput from 'react-text-mask';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import { PageArea, ModalArea, FormInput } from './styled';
import useAPI from '../../helpers/OlxAPI';

import './modal.css';

import { PageContainer, PageTitle, ErrorMessage } from '../../components/MainComponents';



const Page = () => {

    const api = useAPI();
    const fileField = useRef();
    const history = useHistory();

    const [ menuData, SetMenuData ] = useState('my-data');
    const [ myDatas, setMyDatas ] = useState([]);
    const [ countAds, setCountAds ] = useState(0);

    const [ disabled, setDisabled ] = useState(false);
    const [ error, setError ]   = useState('');

    const [ categories, setCategories ] = useState([]);

    let subtitle;
    const [modalIsOpen,setIsOpen] = useState(false);

    const customStyles = {
        content : {
            top                   : '50%',
            left                  : '50%',
            right                 : 'auto',
            bottom                : 'auto',
            marginRight           : '-50%',
            transform             : 'translate(-50%, -50%)'
        }
    };

    const [ titleModal, setTitleModal ] = useState('');
    const [ categoryModal, setCategoryModal ] = useState('');
    const [ priceModal, setPriceModal ] = useState('');
    const [ priceNegotiableModal, setPriceNegotiableModal ] = useState(false);
    const [ descModal, setDescModal ] = useState('');
    const [ idModal, setIdModal ] = useState('');

    const [ name, setName ] = useState('TESTE');
    const [ email, setEmail ] = useState('');
    const [ stateList, setStateList ] = useState([]);
    const [ password, setPassword ] = useState('');
    const [confirmPassword, setConfirmPassword ] = useState('');

    const openModal = () => {
        setIsOpen(true);
    }

    const afterOpenModal = () => {
        //subtitle.style.color = 'rgb(247,131,34)';
    }

    const closeModal = () => {
        setIsOpen(false);
    }

    Modal.setAppElement('#root');

    useEffect(() => {
        const getStates = async () => {
            const slist = await api.getStates();
            setStateList(slist);
        }

        getStates();
    }, []);

    useEffect( () => {
        const getCategories = async () => {
            const cats = await api.getCategories();
            setCategories(cats);
        }
        getCategories();
    }, []);

    useEffect(()=>{
        const getMyData = async () => {
            const datas = await api.getMyData();
            setMyDatas(datas);
            setCountAds(datas.ads.length);
        }
        getMyData();
    }, []);

    const formatDate = (date) => {
        let cDate = new Date(date);
        let cDay = cDate.getDay();
        let cMonth = cDate.getMonth();
        let cYear = cDate.getFullYear();

        return `${cDay}/${cMonth}/${cYear}`;
    }

    const handleSubmitProduct = async (e) => {
        e.preventDefault();
        setDisabled(true);
        setError('');
        let errors = [];

        

        if(!titleModal.trim()){
            errors.push('Sem Título');
        }

        if(!categoryModal){
            errors.push('Sem Categoria');
        }

        if(errors.length === 0){
            const fData = new FormData();
            fData.append('title', titleModal);
            fData.append('price', priceModal);
            fData.append('priceNegotiable', priceNegotiableModal);
            fData.append('desc', descModal);
            fData.append('category', categoryModal);
            fData.append('status', true);

            if(fileField.current.files.length > 0){
                for(let i = 0; i<fileField.current.files.length; i++){
                    fData.append('img', fileField.current.files[i]);
                }
            }

            const json = await api.editAd(fData, idModal);

            if(!json.error){
                history.push(`/ad/${idModal}`);
                return;
            }else{
                setError(json.error);
            }

        }else{
            setError(errors.join("\n"));
        }

        setDisabled(false);
        closeModal();

    }

    const editProduct = (title, category, price, priceNegotiable, desc, id) => {

        setTitleModal(title);
        setCategoryModal(category);
        setPriceModal(price);
        setPriceNegotiableModal(priceNegotiable);
        setDescModal(desc);
        setIdModal(id);

        openModal();
    }

    const priceMask = createNumberMask({
        prefix: 'R$ ',
        includeThousandsSeparator: true,
        thousandsSeparatorSymbol:'.',
        allowDecimal:true,
        decimalSymbol:','
    });

    const handleSubmitEditUser = async (e) => {
        e.preventDefault();
        setDisabled(true);
        setError('');
        let errors = [];

        const json = await api.editUser(name, email);

        if(json.error){
            setError(json.error);
        }else{
            SetMenuData('my-data');
            window.location.href = '/my-account';
        }
        
        setDisabled(false);

        
    }

    const editDataUser = () => {
        SetMenuData('edit-data');
        setName(myDatas.name);
        setEmail(myDatas.email);
    }

    const handleSubmitChangePassword = async (e) => {
        e.preventDefault();
        setDisabled(true);
        setError('');
        let errors = [];

        if(password !== confirmPassword){
            setError('Senhas não batem!');
            setDisabled(false);
            return;
        }

        const json = await api.editPass(password);

        if(json.error){
            setError(json.error);
        }else{
            SetMenuData('my-data');
            window.location.href = '/my-account';
        }
        
        setDisabled(false);

        
    }

    return (
        <PageContainer>
        
            <PageTitle> Minha Conta </PageTitle>

            <hr/>
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                // style={customStyles}
                className="modaledit"
                contentLabel="Exemplo modal"
            >
                <ModalArea>
                    <h3 ref={_subtitle => (subtitle = _subtitle)}> Edição de Produto
                        <span className="fechar" onClick={closeModal}>X</span>
                    </h3>
                    <hr />
                    <FormInput>
                        <form onSubmit={handleSubmitProduct}>
                            <label className="area">
                                <div className="area--title">Título</div>
                                <div className="area--input">
                                    <input 
                                        type="text" 
                                        disabled={disabled} 
                                        value={titleModal}
                                        onChange={e=>setTitleModal(e.target.value)}
                                        required
                                    />
                                </div>
                            </label>

                            <label className="area">
                                <div className="area--title">Categoria</div>
                                <div className="area--input">
                                    <select
                                        disabled={disabled}
                                        onChange={e => setCategoryModal(e.target.value)}
                                        required
                                    >
                                        <option></option>
                                        {categories && categories.map(i => 
                                            <option selected={categoryModal === i.slug} key={i._id} value={i._id}>{i.name}</option>
                                        )}
                                    </select>
                                </div>
                            </label>

                            <label className="area">
                                <div className="area--title">Preço</div>
                                <div className="area--input">
                                    <MaskedInput 
                                    mask={priceMask}
                                    placeholder="R$ "
                                    disabled={disabled || priceNegotiableModal}
                                    value={priceModal}
                                    onChange={e=>setPriceModal(e.target.value)}
                                    />
                                </div>
                            </label>

                            <label className="area">
                                <div className="area--title">Preço Negociável</div>
                                <div className="area--input">
                                    <input
                                        type="checkbox"
                                        disabled={disabled}
                                        checked={priceNegotiableModal}
                                        onChange={() => setPriceNegotiableModal(!priceNegotiableModal)}
                                    />
                                </div>
                            </label>

                            <label className="area">
                                <div className="area--title">Descrição</div>
                                <div className="area--input">
                                    <textarea
                                        disabled={disabled}
                                        value={descModal}
                                        onChange={e=>setDescModal(e.target.value)}
                                    ></textarea>
                                </div>
                            </label>

                            <label className="area">
                                <div className="area--title">Imagens (1 ou mais)</div>
                                <div className="area--input">
                                    <input 
                                        type="file"
                                        disabled={disabled}
                                        ref={fileField}
                                        multiple
                                    />
                                </div>
                            </label>
                            
                            <label className="area">
                                <div className="area--title"></div>
                                <div className="area--input">
                                    <button 
                                        disabled={disabled}
                                    >
                                        Editar Anúncio
                                    </button>
                                </div>
                            </label>
                        </form>
                    </FormInput>
                </ModalArea>
            </Modal>
            <PageArea>
                <div className="leftSide">
                    <ul>
                        <li className={menuData === 'my-data' ? 'active':  ''} onClick={()=>SetMenuData('my-data')}>Meus Dados</li>
                        <li className={menuData === 'edit-data' ? 'active':  ''} onClick={editDataUser}>Editar Dados </li>
                        <li className={menuData === 'change-pass' ? 'active':  ''} onClick={()=>SetMenuData('change-pass')}>Alterar Senha</li>
                    </ul>
                </div>

                <div className="rightSide">
                    {menuData === 'my-data' &&
                        <div className="mydata">
                        <h4>Meus Dados</h4>
                        <div className="dataData">
                            <div className="nameUF">
                                <div className="dataName"><strong>NOME: </strong> { myDatas.name }</div>
                                <div className="dataUF"><strong>Estado: </strong> { myDatas.state } </div>
                            </div>
                            <div className="dataEmail">
                            <div className="dataName"><strong>E-mail: </strong> { myDatas.email }</div>
                            </div>
                        </div>
                        <hr/>
                    
                        {countAds === 0 &&
                            <div className="alertWarning">Nenhum anúncio realizado!</div>
                        }

                        {countAds  > 0 &&
                            <table className="my-ads" cellPadding="0" cellSpacing="0">
                                <caption>Meus Anúncios</caption>
                                <thead>
                                    <tr>
                                        <th>Imagem</th>
                                        <th>Titulo</th>
                                        <th>Preço</th>
                                        <th>Status</th>
                                        <th>Data</th>
                                        <th>Ações</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {myDatas.ads.map((i, k) =>
                                        <tr key={k}>
                                            <td>
                                                {i.images.map((img, k) => 
                                                    img.default &&
                                                    <img key={k} src={`http://alunos.b7web.com.br:501/media/${img.url}`} alt="" />
                                                )}
                                                
                                            </td>
                                            <td>{ i.title }</td>
                                            <td title={i.priceNegotiable ? 'Preço Negociável' : ''} className={i.priceNegotiable ? 'neg': ''}>R$ { i.price }</td>
                                            <td>{ i.status ? 'ATIVO' : 'INATIVO' }</td>
                                            <td>{formatDate(i.dateCreated) }</td>
                                            <td>
                                                <Link to={`/ad/${i.id}`}>Visualizar</Link>
                                                <button
                                                    onClick={ () => editProduct(i.title, i.category, i.price, i.priceNegotiable, i.description, i.id)
                                                        /*
                                                            setTitleModal(i.title);
                                                            setCategoryModal(i.category);
                                                            setPriceModal(i.price);
                                                            setPriceNegotiableModal(i.priceNegotiable);
                                                            setDescModal(i.description);
                                                        */
                                                            
                                                        
                                                    }
                                                >
                                                    Editar 
                                                </button>
                                            </td>
                                        </tr>
                                        
                                    )}
                                </tbody>
                                </table>
                        }

                    </div>
                    }

                    { menuData === 'edit-data' &&
                        
                        <div className="myData">
                            <h4>Alteração de Dados</h4>
                            <hr/>

                            <FormInput>
                                <form onSubmit={handleSubmitEditUser}>
                                    <label className="area">
                                        <div className="area--title">Nome Completo</div>
                                        <div className="area--input">
                                            <input
                                                type="text"
                                                disabled={disabled}
                                                value={name}
                                                onChange={e => setName(e.target.value)}
                                                required
                                            />
                                        </div>
                                    </label>

                                    <label className="area">
                                        <div className="area--title">E-mail</div>
                                        <div className="area--input">
                                            <input 
                                                type="email" 
                                                disabled={disabled} 
                                                value={email}
                                                onChange={e=>setEmail(e.target.value)}
                                                required
                                            />
                                        </div>
                                    </label>

                                    <label className="area">
                                        <div className="area--title"></div>
                                        <div className="area--input">
                                            <button disabled={disabled}>Salvar</button>
                                        </div>
                                    </label>

                                </form>
                            </FormInput>
                        </div>
                    }

                    { menuData === 'change-pass' &&
                        <div>
                            <div className="myData">
                                <h4>Alteração de Senha</h4>
                                <hr/>

                                {error &&

                                <ErrorMessage> {error} </ErrorMessage>

                                }

                                <FormInput>
                                    <form onSubmit={handleSubmitChangePassword}>
                                    <label className="area">
                                        <div className="area--title">Senha</div>
                                        <div className="area--input">
                                            <input 
                                                type="password" 
                                                disabled={disabled} 
                                                onChange={e => setPassword(e.target.value)}
                                                required
                                            />
                                        </div>
                                    </label>

                                    <label className="area">
                                        <div className="area--title">Confirmar Senha</div>
                                        <div className="area--input">
                                            <input
                                                type="password"
                                                disabled={disabled}
                                                onChange={e => setConfirmPassword(e.target.value)}
                                                required
                                            />
                                        </div>
                                    </label>

                                        <label className="area">
                                            <div className="area--title"></div>
                                            <div className="area--input">
                                                <button disabled={disabled}>Salvar</button>
                                            </div>
                                        </label>

                                    </form>
                                </FormInput>
                            </div>
                        </div>
                    }
                </div>
            </PageArea>
        </PageContainer>
    );

}

export default Page;
