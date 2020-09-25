import React, { useState, useEffect } from 'react';
//import './cliente-cadastro.css';
import firebase from '../../config/firebase';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from '../../componentes/navbar';

function MeusClientes(){

    const [carregando, setCarregando] = useState(true);
    const [msgTipo, setMsgTipo] = useState();
    const [clientes, setClientes] = useState();

    const db = firebase.firestore();

    useEffect(()=>{
        if (carregando) {
            db.collection('clientes').get().then(clientesResp => {
                let dadosClientes = [];
                clientesResp.forEach(function(doc) {
                    dadosClientes.push(doc.data())
                })
                setClientes(dadosClientes)
                setCarregando(false)
            })
        }
    },[]);


	return(
        <>
            <Navbar/>
            <div className="col-12 mt-2 font-weight-normal text-black font-weight-bold">
                <div className="row">
                    <h3 className="mx-auto font-weight-bold">Clientes</h3>
                    <div className="col-12">
                        <div className="col-4">
                            <h5>Nome</h5>
                        </div>
                        <div className="col-4">
                            <h5>CPF</h5>
                        </div>
                        <div className="col-4">
                            <h5>Cidade</h5>
                        </div>   
                    </div>                                     
                    { carregando && <p>Carregando...</p> ||
                    clientes.map(cliente => 
                        <div className="col-12">
                            <div className="col-4">
                                <p>{cliente.nome ? cliente.nome : ''}</p>
                            </div>
                            <div className="col-4">
                                <p>{cliente.cpf ? cliente.cpf : ''}</p>
                            </div>
                            <div className="col-4">
                                <p>{cliente.cidade ? cliente.cidade : ''}</p>
                            </div>                                        
                        </div>
                    )}                    
                </div>
            </div>
        </>
    )
    }
export default MeusClientes;