import React from 'react';
import { Link } from 'react-router-dom';

const Page = () => {
    return (
        <div>
            <h1>404 - Página Não Encontrada!</h1>

            <Link to="/">Voltar Para a Home</Link>
        </div>
    );
};

export default Page;