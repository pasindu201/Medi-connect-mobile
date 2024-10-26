import 'dart:ui'; // Import this to use BackdropFilter
import 'package:flutter/material.dart';

class AppointmentButton extends StatelessWidget {
  final Color color;
  final String text;
  final VoidCallback onPressed;

  const AppointmentButton({
    super.key,
    required this.color,
    required this.text,
    required this.onPressed,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      margin: const EdgeInsets.symmetric(vertical: 5),
      child: ClipRRect(
        borderRadius: BorderRadius.circular(10), // Optional: Rounded corners
        child: BackdropFilter(
          filter: ImageFilter.blur(sigmaX: 5.0, sigmaY: 5.0), // Adjust the blur intensity here
          child: Container(
            color: color.withOpacity(0.6), // Semi-transparent background color
            child: ElevatedButton(
              style: ElevatedButton.styleFrom(
                backgroundColor: Colors.transparent, // Make button transparent to show blur
                elevation: 0, // Remove shadow for a flatter appearance
              ),
              onPressed: onPressed,
              child: Text(
                text,
                style: const TextStyle(color: Colors.black),
              ),
            ),
          ),
        ),
      ),
    );
  }
}
