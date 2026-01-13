import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Kết hợp và áp dụng có điều kiện các class CSS.
 *
 * Hàm nhận vào nhiều giá trị class khác nhau (chuỗi, mảng, object hoặc giá trị falsy),
 * xử lý chúng bằng `clsx`, sau đó gộp và loại bỏ xung đột class Tailwind CSS
 * bằng `tailwind-merge`.
 *
 * @param {...ClassValue} inputs - Danh sách class hoặc class có điều kiện.
 * @returns {string} Chuỗi class đã được gộp và loại bỏ trùng/xung đột.
 *
 * @example
 * cn("p-4", "text-sm", isActive && "bg-blue-500")
 *
 * @example
 * cn("p-2 p-4", "p-6") // => "p-6"
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}
