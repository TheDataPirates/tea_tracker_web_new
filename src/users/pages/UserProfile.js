import React, {useContext, useEffect, useState} from "react";
// @material-ui/core components
import {makeStyles} from "@material-ui/core/styles";
import Button from '../../shared/components/FormElements/Button';
// import CustomInput from "components/CustomInput/CustomInput.js";
import Card from "../../shared/components/UIElements/Card";


import {AuthContext} from "../../shared/context/auth-context";
import {useHttpClient} from "../../shared/hooks/http-hook";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import Avatar from "../../shared/components/UIElements/Avatar";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import './UserProfile.css'
import {Grid} from "@material-ui/core";

const styles = {

    cardTitleWhite: {
        height: "70em"
    }
};

const useStyles = makeStyles(styles);

const UserProfile = () => {
    const classes = useStyles();
    const auth = useContext(AuthContext);
    const {isLoading, error, sendRequest, clearError} = useHttpClient();
    const [loadedUser, setLoadedUser] = useState();
    // const userId = useParams().userId;

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const responseData = await sendRequest(
                    `http://localhost:8080/auth/users/${auth.userId}`
                );
                console.log(responseData.user[0].user_id);
                setLoadedUser(responseData.user[0]);
                console.log(loadedUser.name);
            } catch (err) {
            }
        };
        fetchUsers();

    }, [sendRequest, auth.userId]);


    if (isLoading) {
        return (
            <div className="center">
                <LoadingSpinner/>
            </div>
        );
    }

    if (!loadedUser && !error) {
        return (
            <div className="center">
                <Card>
                    <h2>Could not find user!</h2>
                </Card>
            </div>
        );
    }
    return (
            <Grid container direction="column" justify="center" alignItems="center" style={{height:"50em"}}>
                <Grid item>
                    <ErrorModal error={error} onClear={clearError}/>

                    <Card className="user-profile-item__content">
                        {isLoading && <LoadingSpinner asOverlay/>}
                        <div className="user-profile-item__image">
                            <img
                                src={`http://localhost:8080/${loadedUser.image}`}
                                alt={loadedUser.name}
                            />
                        </div>
                        <div className="user-profile-item__info">
                            <h1>{loadedUser.name}</h1>
                            <h2>{loadedUser.user_id}</h2>
                            <p>{loadedUser.user_type}</p>
                            <h3>{loadedUser.address}</h3>
                            <h4>{loadedUser.nic}</h4>
                            <p>{loadedUser.telephone_no}</p>

                        </div>
                        <div className="user-profile-item__actions">
                            <Button to={`/users/${loadedUser.user_id}`}>EDIT</Button>
                        </div>

                    </Card>
                </Grid>
            </Grid>
    );
}
export default UserProfile;
