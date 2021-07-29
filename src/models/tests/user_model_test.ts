import { User, UserStore } from '../user_model';
import jsonwebtoken from 'jsonwebtoken';

/******************************************************** */
// Handler
/******************************************************** */
const user = new UserStore();

describe('User Model', () => {

    it('should have an getUsers method', () => {
        expect(user.getUsers).toBeDefined();
    });

    it('should have an getUserById method', () => {
        expect(user.getUserById).toBeDefined();
    });

    it('should have an createUser method', () => {
        expect(user.createUser).toBeDefined();
    });

    it('should have an deleteUser method', () => {
        expect(user.deleteUser).toBeDefined();
    });

    it('createUser method should add a user', async () => {
        const result = await user.createUser({
            first_name: "first",
            last_name: "last",
            username: "test_user",
            password: "xxxxx"
        });

        expect(result.first_name).toEqual('first');
        expect(result.last_name).toEqual('last');
        expect(result.username).toEqual('test_user');
       
        user.deleteUser(result.id);
    });

    it('getUsers method should return a list of users', async () => {
        const test_user = await user.createUser({
            first_name: "first",
            last_name: "last",
            username: "test_user",
            password: "xxxxx"
        });


        const result = await user.getUsers();
        expect(result[0].first_name).toEqual('first');
        expect(result[0].last_name).toEqual('last');
        expect(result[0].username).toEqual('test_user');

        user.deleteUser(test_user.id);
    });
 
   
    it('getUserById method should return the correct user', async () => {
        const test_user = await user.createUser({
            first_name: "first",
            last_name: "last",
            username: "test_user",
            password: "xxxxx",
        });

        const result = await user.getUserById(test_user.id);
        
        expect(result.first_name).toEqual("first");
        expect(result.last_name).toEqual('last');
        expect(result.username).toEqual('test_user');
        user.deleteUser(test_user.id);
    });


    it('delete method should remove the user', async () => {
        const test_user = await user.createUser({
            first_name: "first",
            last_name: "last",
            username: "test_user",
            password: "xxxxx",
        });

        expect(test_user.first_name).toEqual("first");

        await user.deleteUser(test_user.id);

        const result = await user.getUsers();
    
        expect(result).toEqual([]);

    });

});