//ARQUIVO PRINCIPAL
import express, { application } from "express";
import * as dotenv from "dotenv";
import { v4 as uuidv4 } from 'uuid';

//habilitar o servidor a ter variáveis de ambiente
dotenv.config();
//instanciar a variável que vai ficar responsável pelo nosso servidor -> app
const app = express();
//configurar o servidor para aceitar enviar e receber arquivos em JSON
app.use(express.json());

// banco de dados
let data = [
]

//ROTAS
//método get
app.get('/', (request,response) => {
    // no json colocamos a resposta que queremos ter
    //esse status(200) é mais pra ser um nivel de segurança
    return response.status(200).json(data)
});

// MÉTODO POST
app.post('/create', (request, response) => {
    const newData = {
        // capturar o body da requisição e adicionar um id
        ...request.body,
        id: uuidv4()
    }

    data.push(newData)

    return response.status(201).json(data)
})

//MÉTODO DELETE
app.delete('/delete/:id', (req,res) => 
{const {id} = req.params;

const deleteById = data.find((item) => {
    return item.id === id
})

const index = data.indexOf(deleteById)

data.splice(index,1);

return res.status(200).json(data)}
)

//MÉTODO PUT
app.put('/edit/:id',(req,res) => {
    const {id} = req.params;
    console.log(req.params);

    const updateById = data.find((item) => {
       return item.id === id
    });
    console.log(updateById);
    const index = data.indexOf(updateById);

    console.log(index);
    data[index] = {
        ...updateById,
        ...req.body
    }
    
    console.log(req.body);
    console.log(data[index]);


    return res.status(200).json(data)
})


// app.listen(8080, () => console.log('server on port 8080!'))
app.listen(Number(process.env.PORT), () => console.log('server on port 8080!'))

