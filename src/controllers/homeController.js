const router = require("express").Router();
const { getAll } = require("../services/housingService")

router.get('/', async (req, res) => {

    let houses = await getAll()
    houses = houses.slice(0, 3)
    res.render('home', { houses })
});

module.exports = router;


