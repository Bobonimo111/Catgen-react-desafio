import React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { GerarImagem } from './GerarImagem';

interface Formulario {
  texto: string;
}

function App() {
  // Isso é como um state para formulários, ele gerencia o estado dos inputs de forma mais simples
  // Register registra informação em um estado e handleSubmit lida com o evento de submit do formulário executando a função passada por parâmetro
  const { register, handleSubmit } = useForm<Formulario>();
  const [imagem, setImagem] = useState<React.ReactNode | null>(null);

  // Função chamada quando o formulário for submetido
  const onSubmit = async (data: Formulario) => {
    try {
      const resposta = await GerarImagem(data.texto);
      // Atualiza o estado da imagem com a URL retornada pela API
      setImagem(<img src={resposta.url} alt={data.texto} className="img-fluid" />);
    } catch (erro) {
      setImagem(<p>erro</p>);
    }
  };

  return (
    <>

      <div className="container text-white p-3">
        <div>
          {/* Formulário controlado pelo react-hook-form */}
          <form onSubmit={handleSubmit(onSubmit)} className="p-3 border rounded bg-white mx-5 d-flex flex-column flex-md-row justify-content-center align-items-center gap-3">
            <div className="col-8 mb-3">
              <input
                required
                type="text"
                className="form-control"
                id="texto"
                aria-describedby="texto"
                // Vai registrar o input no react-hook-form com a chave texto
                {...register('texto')}
              />
              <div id="texto" className="form-text">Adicione um texto para ser mesclado a imagem de um gato</div>
            </div>
            <div className="col-auto d-flex align-items-start" >
              <button type="submit" className="btn btn-primary">Gerar</button>
            </div>
          </form>
        </div>
        <div id="imagem" style={{ minHeight: '500px' }} className="border rounded bg-white h-auto d-flex justify-content-center align-items-center mt-4">
          {/* Aqui vai a imagem do gato gerada */}
          {imagem}
        </div>
        <div className="text-black text-center mt-4">Create by <a href="https://github.com/Bobonimo111">bobonimo111</a></div>
      </div>
    </>
  );
}

export default App;
