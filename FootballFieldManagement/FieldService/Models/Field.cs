using System.ComponentModel.DataAnnotations;

namespace FieldService.Models
{
    public class Field
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; } // Tên sân bóng
        public string Location { get; set; } // Địa chỉ
        public decimal PricePerHour { get; set; } // Giá thuê mỗi giờ
        public bool IsAvailable { get; set; } // Trạng thái sẵn sàng
    }
}
