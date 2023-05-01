



import { notify } from 'node-notifier';
// String
// notify('Message');

// Object



export default async function segg(req, res) {
    notify({
        title: 'My notification',
        message: 'Hello, there!'
    });

    return res.status(200).json("ayeee")
}

