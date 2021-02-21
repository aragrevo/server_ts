import { Request, Response } from 'express';
import User from '../models/user';

export const getUsers = async (req: Request, res: Response) => {

    const users = await User.findAll();
    res.json({
        users
    });
}

export const getUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await User.findByPk(id);

    if (!user) {
        res.status(404).json({
            msg: 'No existe usuario',
            id
        });
        return;
    }
    res.json({
        user
    });
}

export const saveUser = async (req: Request, res: Response) => {
    const { body } = req;

    try {

        const existEmail = await User.findOne({
            where: {
                email: body.email
            }
        });

        if (existEmail) {
            return res.status(400).json({
                msg: `Ya existe un usuario con el email ${body.email}`
            })
        }

        const user = new User(body);
        await user.save();
        res.json({
            user
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Hable con el administrador: ${error}`
        })
    }
}

export const updateUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { body } = req;

    try {

        const user = await User.findByPk(id);

        if (!user) {
            return res.status(400).json({
                msg: `No existe el usuario`
            })
        }

        await user.update(body);
        res.json({
            user
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Hable con el administrador: ${error}`
        })
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {

        const user = await User.findByPk(id);

        if (!user) {
            return res.status(400).json({
                msg: `No existe el usuario`
            })
        }

        // await user.destroy();
        await user.update({ state: false });
        res.json({
            user
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Hable con el administrador: ${error}`
        })
    }
}