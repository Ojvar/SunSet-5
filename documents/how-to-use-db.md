# How to use DB

There is an example of how to create an instance of User model,
  fill it's data, and how to save that

enjoy ;)

```
    const User: Model<IUserModel> = GlobalData.dbEngine.model("User");
    const user: Document = await User.create({
      name: "User name " + new Date(),
      pwd: "Password",
      activated_at: new Date(),
    } as IUserModel);
    console.log(user);
  ```