package com.ja.optimgui;

import javafx.application.Application;
import javafx.fxml.FXMLLoader;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.image.Image;
import javafx.stage.Stage;

public class MainApp extends Application {

    private int swarmSize;
    private double inertia;
    private double c1;
    private double c2;
    private int iterStop;
    private MainViewController mainViewController;

    @Override
    public void start(Stage primaryStage) throws Exception {
        FXMLLoader fxmlLoader = new FXMLLoader(getClass().getResource("mainView.fxml"));
        Parent root = (Parent) fxmlLoader.load();

        mainViewController =  fxmlLoader.getController();
        mainViewController.setMainApp(this);

        Scene scene = new Scene(root);
        primaryStage.setTitle("Badanie produkcji");
        Image programIcon = new Image("wuzekpsculka.png");
        primaryStage.getIcons().add(programIcon);
        primaryStage.setScene(scene);
        primaryStage.show();
    }

    public void calculate(){
        swarmSize = mainViewController.getSwarmSize();
        inertia = mainViewController.getInertia();
        c1 = mainViewController.getC1();
        c2 = mainViewController.getC2();
        iterStop = mainViewController.getIterStop();

        System.out.println("Dane{" +
                "swarmSize=" + swarmSize +
                ", inertia=" + inertia +
                ", c1=" + c1 +
                ", c2=" + c2 +
                ", iterStop=" + iterStop +
                '}');
    }

    public static void main(String[] args) {
        launch();
    }


}
