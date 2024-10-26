import 'dart:async';
import 'package:flutter/material.dart';

class PasswordField extends StatefulWidget {
  const PasswordField({super.key});

  @override
  _PasswordFieldState createState() => _PasswordFieldState();
}

class _PasswordFieldState extends State<PasswordField> {
  late String _password;
  late String passwordStrength;
  late Color passwordStrengthColor;
  late double passwordStrengthLevel;
  final StreamController<int> _streamController = StreamController<int>();

  @override
  void dispose() {
    _streamController.close();
    super.dispose();
  }

  void passwordStrengthChecker(String password) {
    int strength = passwordStrengthLevelCheck(password);
    _streamController.add(strength);
  }

  int passwordStrengthLevelCheck(String s) {
    int strength = 0;
    RegExp uppercaseCheck = RegExp(r'^(?=.*?[A-Z])');
    RegExp numberCheck = RegExp(r'^(?=.*[0-9].*[0-9])');
    RegExp specialCharacterCheck = RegExp(r'^(?=.*[!@#$&*])');

    if (uppercaseCheck.hasMatch(s)) {
      strength++;
    }
    if (numberCheck.hasMatch(s)) {
      strength++;
    }
    if (specialCharacterCheck.hasMatch(s)) {
      strength++;
    }
    return strength;
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        TextField(
          obscureText: true,
          style: const TextStyle(color: Colors.white),
          onChanged: (value) {
            _password = value;
            passwordStrengthChecker(_password);
          },
          decoration: const InputDecoration(
            labelText: 'Password',
            labelStyle: TextStyle(color: Colors.white),
            filled: true,
            fillColor: Colors.white24,
            border: OutlineInputBorder(
              borderRadius: BorderRadius.all(Radius.circular(12)),
            ),
          ),
        ),
        const SizedBox(height: 20),
        Container(
          child: StreamBuilder<int?>(
            stream: _streamController.stream,
            builder: (context, snapshot) {
              if (snapshot.data == null ) {
                passwordStrengthColor = Colors.grey;
                passwordStrengthLevel = 0;
                passwordStrength = "Enter a password";
              } else if ( snapshot.data == 0 || snapshot.data == 1) {
                passwordStrengthColor = Colors.red;
                passwordStrengthLevel = 0.3;
                passwordStrength = "Weak";
              } else if (snapshot.data == 2) {
                passwordStrengthColor = Colors.orange;
                passwordStrengthLevel = 0.65;
                passwordStrength = "Moderate";
              } else if (snapshot.data == 3) {
                passwordStrengthColor = Colors.green;
                passwordStrengthLevel = 1;
                passwordStrength = "Strong";
              }
              return Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  LinearProgressIndicator(
                    value: passwordStrengthLevel,
                    color: passwordStrengthColor,
                    backgroundColor: Colors.grey,
                    minHeight: 5, // Better height management
                  ),
                  const SizedBox(height: 10),
                  Center( // Wrapping in Center to avoid overflow
                    child: Text(
                      passwordStrength,
                      style: const TextStyle(
                        color: Colors.white,
                        fontSize: 16,
                      ),
                    ),
                  ),
                ],
              );
            },
          ),
        ),
      ],
    );
  }
}
