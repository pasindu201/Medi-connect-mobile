import 'package:flutter/material.dart';

Color getAppointmentStatusColor(String appointmentStatus) {
  switch (appointmentStatus) {
    case 'Queued':
      return const Color(0xFFB3E5FC);
    case 'Completed':
      return const Color(0xFFB3E5FC);
    case 'Missed':
      return const Color(0xFFB3E5FC);
    case 'Upcoming':
      return const Color(0xFFB3E5FC);
    default:
      return const Color(0xFFB3E5FC);
  }
}
