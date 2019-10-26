import { Router } from "express";

const router = Router();

router.get("/", async (req, res) => {
  const users = await req.context.models.User.findAll();

  return res.send(users);
});

router.put("/", async (req, res) => {
  const prevUser = await req.context.models.User.findByUsername(
    req.body.username
  );

  if(prevUser) return res.status(409).send('username already exist')

  const user = await req.context.models.User.create(req.body);
  return res.status(200).send(user);
});

router.get("/:username", async (req, res) => {
  const user = await req.context.models.User.findByUsername(
    req.params.username
  );

  if (!user) return res.status(404).send("user not found");

  return res.status(200).send(user);
});

router.put("/:username", async (req, res) => {
  req.context.models.User.update(
    { tweet: req.body.tweet },
    {
      returning: true,
      where: { username: req.params.username }
    }
  ).then(() => {
    res.status(200).send("update successful");
  });
});

export default router;
