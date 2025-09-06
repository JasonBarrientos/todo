import { ApiProperty } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common';

export class ErrorResponseDto {
  @ApiProperty({ example: false, description: 'Indica que la operación falló' })
  success: boolean;

  @ApiProperty({ example: HttpStatus.BAD_REQUEST, description: 'Código HTTP de la respuesta' })
  statusCode: number;

  @ApiProperty({ example: 'Validation failed', description: 'Mensaje principal del error' })
  message: string;

  @ApiProperty({ example: '/api/users', description: 'Ruta donde ocurrió el error' })
  path: string;

  @ApiProperty({ example: '2025-09-03T05:30:00.000Z', description: 'Fecha y hora del error' })
  timestamp: string;

  @ApiProperty({ 
    example: ['email must be a valid email', 'password too short'], 
    description: 'Errores específicos de validación o detalles adicionales', 
    required: false 
  })
  errors?: string[];

  @ApiProperty({ 
    example: 'USER_NOT_FOUND', 
    description: 'Código de error de negocio (opcional)', 
    required: false 
  })
  errorCode?: string;
}
