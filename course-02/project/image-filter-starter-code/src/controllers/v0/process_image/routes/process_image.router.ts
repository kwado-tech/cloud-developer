import { Request, Response, Router } from "express";
import {filterImageFromURL, deleteLocalFiles} from '../../../../util/util';

const router: Router = Router();

router.get('/', async (req: Request, res: Response) => {
    // validate query-params
    const { image_url } = req.query;

    if (!image_url) {
        return res.status(422).send({ message: 'Image URL is required!' });
    }

    // process image from url and send response
    const filteredImagePath = await filterImageFromURL(image_url);
    res.status(200).sendFile(filteredImagePath, async (e) => {
        await deleteLocalFiles([filteredImagePath]);
    });
});

export const ProcessImageRouter: Router = router;