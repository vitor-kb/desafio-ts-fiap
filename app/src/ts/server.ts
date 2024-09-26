import express from "express";
import * as db from "./database.js";

const server = express();
server.use(express.json());

server.get('/', (req, res) => {
    res.status(200).send('API CRUD BIBLIOTECA');
});

server.get('/livros', async (req, res) => {
    const books = await db.listBooks();
    res.status(200).json(books);
});

server.get('/livros/:id', async (req, res) => {
    const books = await db.findBookById(req.params.id);
    res.status(200).json(books);
});

server.post('/livros', (req, res) => {
    const bookFromRequest = req.body;
    db.createBook(bookFromRequest)
    .then(() => res.status(201).send(`Livro ${bookFromRequest.title} criado com sucesso`))
    .catch(() => res.status(500).send(`Erro ao criar o livro ${bookFromRequest.title}`));
    
});

server.put('/livros/:id', (req, res) => {
    const bookFromRequest = req.body;
    db.updateBook(bookFromRequest)
    .then(() => res.status(200).send(`Livro de ID: ${bookFromRequest.id} atualizado com sucesso`))
    .catch(() => res.status(500).send(`Erro ao atualizar o livro ${bookFromRequest.title}`));
    
});

server.delete('/livros/:id', (req, res) => {
    const { id } = req.params; 
    db.deleteBook(id)
    .then(() => res.status(200).send(`O Livro de ID: ${id} foi deletado com sucesso`))
    .catch(() => res.status(500).send(`Erro ao deletar o livro id ${id}`));
});

export default server;