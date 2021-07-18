import { SiteClient } from 'datocms-client';

export default async function requests(req, res) {
    if(req.method == 'POST') {

        const token = process.env.NEXT_PUBLIC_CMS_TOKEN;
    
        const client = new SiteClient(token);
    
        const register = await client.items.create({
            itemType: '967826',
            ...req.body,
        });
    
        res.json({
            dados: 'Algum dado qualquer :)',
            register
        });
        return;
    }
}