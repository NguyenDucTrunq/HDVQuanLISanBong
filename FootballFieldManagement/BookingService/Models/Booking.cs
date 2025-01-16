using System.ComponentModel.DataAnnotations;

namespace BookingService.Models
{
    public class Booking
    {
        public int Id { get; set; }
        public int UserId { get; set; }  // ID của người dùng đặt sân
        public int FieldId { get; set; } // ID của sân bóng
        public DateTime StartTime { get; set; } // Thời gian bắt đầu
        public DateTime EndTime { get; set; } // Thời gian kết thúc 
        public string Name { get; set; } // Tên sân bóng
        public string Location { get; set; } // Địa chỉ
        public decimal PricePerHour { get; set; } // Giá thuê mỗi giờ
        public bool IsAvailable { get; set; } // Trạng thái sẵn sàng
        }
    

}

