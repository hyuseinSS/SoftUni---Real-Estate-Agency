const router = require("express").Router();
const House = require("../models/House");
const User = require("../models/User");
const { createHouse, getAll, search, getOne, updateOne, deleteOne } = require("../services/housingService")



router.get('/for-rent', async (req, res) => {
    const houses = await getAll()
    res.render("aprt-for-rent", { houses })
})

router.get('/create', async (req, res) => {

    if (!req.user) {
        return res.render('404')
    }
    res.render("create")
})

router.post('/create', async (req, res) => {

    try {
        const house = req.body;
        house.owner = req.user._id
        await createHouse(house)

        res.redirect("/housing/for-rent")
    } catch (err) {
        res.render('create', { error: err.message })
        return;
    }

})

router.get('/details/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const house = await getOne(id)

    } catch (err) {
        return res.render('404')
    }
    let house = await getOne(id)
    house.isOwned = house.owner == req.user?._id

    const isRentedByUser = house.rentedBy.find((element) => element == req.user?._id)
    let tenants = await House.findOne({ _id: id })
    let result = []

    tenants = tenants.rentedBy
    for (const tenant of tenants) {
        const user = await User.findOne({ _id: tenant })
        result.push(user.name)
    }
    house.result = result.join(', ')

    if (isRentedByUser) {
        house.isAlreadyRented = true
    }
    res.render('details', { house })
})

router.get('/delete/:id', async (req, res) => {
    const house = await getOne(req.params.id)
    if (req.user?._id != house.owner) {
        return res.redirect('/')
    }
    await deleteOne(req.params.id)
    res.redirect('/housing/for-rent')
})
router.get('/edit/:id', async (req, res) => {
    const id = req.params.id;
    const house = await getOne(id)

    if (!req.user) {
        return res.render('404')
    }
    if (req.user?._id != house?.owner) {
        return res.redirect('/')
    }

    res.render('edit', { house })

})

router.post('/edit/:id', async (req, res) => {

    const id = req.params.id;
    let house = await getOne(id)
    const updatedHouse = req.body
    if (req.user._id != house.owner) {
        return res.redirect('/')
    }
    await updateOne(id, updatedHouse)
    house = await getOne(id)
    res.render('details', { house })
});


router.get('/search', (req, res) => {
    if (!req.user) {
        return res.redirect('/')
    }
    res.render('search');
});

router.post('/search', async (req, res) => {


    if (!req.user) {
        return res.redirect('/')
    }
    const searchString = req.body.search
    const result = await search(searchString)
    res.render('search', { result })
});



router.get('/rent/:id', async (req, res) => {


    if (!req.user) {
        return res.redirect('/')
    }
    const house = await getOne(req.params.id)

    if (house.availability > 0) {
        house.rentedBy.push(req.user._id)
        house.availability--
        await updateOne(req.params.id, house)
        res.redirect(`/housing/details/${req.params.id}`)
    }
    return;
})

module.exports = router;
